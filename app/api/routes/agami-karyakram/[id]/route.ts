import { NextRequest, NextResponse } from 'next/server';
import KaryakramServices from '../../../services/agami-karyakram/karyakramServices';
import { uploadToS3 } from '../../../controller/imageController';

const karyakramServices = new KaryakramServices();

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const karyakram = await karyakramServices.getKaryakramById(id);
        return NextResponse.json(karyakram);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to get karyakram by id' }, { status: 500 });
    }
}   

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let karyakramData: any;
        const contentType = request.headers.get('content-type') || '';
        
        if (contentType.includes('multipart/form-data')) {
            const formData = await request.formData();
            const file = formData.get('image') as File | null;
            const formDataObj = Object.fromEntries(formData.entries());
            karyakramData = { ...formDataObj };
            
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
                karyakramData.image = uploaded.url;
            }
        } else {
            karyakramData = await request.json();
        }
        
        const karyakram = await karyakramServices.updateKaryakram(id, karyakramData);
        return NextResponse.json(karyakram);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to update karyakram' }, { status: 500 });
    }
}   

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await karyakramServices.deleteKaryakram(id);
        return NextResponse.json({ message: 'Karyakram deleted successfully' });
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to delete karyakram' }, { status: 500 });
    }
}   