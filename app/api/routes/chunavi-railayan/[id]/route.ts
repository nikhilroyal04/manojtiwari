import { NextRequest, NextResponse } from 'next/server';
import ChunaviRailayanServices from '../../../services/chunavi-railayan/railayanServices';
import { uploadToS3 } from '../../../controller/imageController';

const chunaviRailayanServices = new ChunaviRailayanServices();

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const chunaviRailayan = await chunaviRailayanServices.getChunaviRailayanById(id);
        return NextResponse.json(chunaviRailayan);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to get chunavi railayan by id' }, { status: 500 });
    }
}   

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let chunaviRailayanData: any;
        const contentType = request.headers.get('content-type') || '';
        
        if (contentType.includes('multipart/form-data')) {
            const formData = await request.formData();
            const file = formData.get('image') as File | null;
            const formDataObj = Object.fromEntries(formData.entries());
            chunaviRailayanData = { ...formDataObj };
            
            if (file) {
                // Convert File to Multer-like file object
                const buffer = Buffer.from(await file.arrayBuffer());
                const multerFile = {
                    fieldname: 'image',
                    originalname: file.name,
                    encoding: '7bit',
                    mimetype: file.type,
                    buffer: buffer,
                    size: file.size
                } as Express.Multer.File;
                
                const uploaded = await uploadToS3(multerFile);
                chunaviRailayanData.image = uploaded.url;
            }
        } else {
            chunaviRailayanData = await request.json();
        }
        
        const chunaviRailayan = await chunaviRailayanServices.updateChunaviRailayan(id, chunaviRailayanData);
        return NextResponse.json(chunaviRailayan);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to update chunavi railayan' }, { status: 500 });
    }
}   

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await chunaviRailayanServices.deleteChunaviRailayan(id);
        return NextResponse.json({ message: 'Chunavi railayan deleted successfully' });
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to delete chunavi railayan' }, { status: 500 });
    }
}   