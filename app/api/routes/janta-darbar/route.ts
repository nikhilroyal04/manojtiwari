import { NextRequest, NextResponse } from 'next/server';
import JantaDarbarServices from '../../services/janta-darbar/darbarServices';
import { uploadToS3 } from '../../controller/imageController';

const jantaDarbarServices = new JantaDarbarServices();

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File | null;
        const formDataObj = Object.fromEntries(formData.entries());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const jantaDarbarData: any = { ...formDataObj };
        
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
        
        const jantaDarbar = await jantaDarbarServices.createJantaDarbar(jantaDarbarData);
        return NextResponse.json(jantaDarbar);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to create Janta Darbar event' }, { status: 500 });
    }
}   

export async function GET() {
    try {
        const jantaDarbars = await jantaDarbarServices.getJantaDarbars();
        return NextResponse.json(jantaDarbars);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to get Janta Darbar events' }, { status: 500 });
    }
}   