import { NextRequest, NextResponse } from 'next/server';
import AdhikariServices from '../../../services/sampark-adhikari/adhikariServices';
import { uploadToS3 } from '../../../controller/imageController';

const adhikariServices = new AdhikariServices();

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const adhikari = await adhikariServices.getAdhikariById(id);
        return NextResponse.json(adhikari);
    } catch (error: unknown) {
        if (error instanceof Error) {       
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to get adhikari by id' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let adhikariData: any;
        const contentType = request.headers.get('content-type') || '';
        
        if (contentType.includes('multipart/form-data')) {
            const formData = await request.formData();
            const file = formData.get('image') as File | null;
            const formDataObj = Object.fromEntries(formData.entries());
            adhikariData = { ...formDataObj };
            
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
                adhikariData.image = uploaded.url;
            }
        } else {
            adhikariData = await request.json();
        }
        
        const adhikari = await adhikariServices.updateAdhikari(id, adhikariData);
        return NextResponse.json(adhikari);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to update adhikari' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await adhikariServices.deleteAdhikari(id);
        return NextResponse.json({ message: 'Adhikari deleted successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to delete adhikari' }, { status: 500 });
    }
}