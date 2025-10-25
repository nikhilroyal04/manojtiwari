import { NextRequest, NextResponse } from 'next/server';
import JantaDarbarServices from '../../../services/janta-darbar/darbarServices';
import { uploadToS3 } from '../../../controller/imageController';

const jantaDarbarServices = new JantaDarbarServices();

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const jantaDarbar = await jantaDarbarServices.getJantaDarbarById(id);
        if (!jantaDarbar) {
            return NextResponse.json({ error: 'Janta Darbar event not found' }, { status: 404 });
        }
        return NextResponse.json(jantaDarbar);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to fetch Janta Darbar event' }, { status: 500 });
    }
}       

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let jantaDarbarData: any;
        const contentType = request.headers.get('content-type') || '';
        
        if (contentType.includes('multipart/form-data')) {
            const formData = await request.formData();
            const file = formData.get('image') as File | null;
            const formDataObj = Object.fromEntries(formData.entries());
            jantaDarbarData = { ...formDataObj };
            
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
                jantaDarbarData.image = uploaded.url;
            }
        } else {
            jantaDarbarData = await request.json();
        }
        
        const jantaDarbar = await jantaDarbarServices.updateJantaDarbar(id, jantaDarbarData);
        if (!jantaDarbar) {
            return NextResponse.json({ error: 'Janta Darbar event not found' }, { status: 404 });
        }
        return NextResponse.json(jantaDarbar);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to update Janta Darbar event' }, { status: 500 });
    }
}   

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {        
    try {
        const { id } = await params;
        await jantaDarbarServices.deleteJantaDarbar(id);
        return NextResponse.json({ message: 'Janta Darbar event deleted successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to delete Janta Darbar event' }, { status: 500 });
    }
}       