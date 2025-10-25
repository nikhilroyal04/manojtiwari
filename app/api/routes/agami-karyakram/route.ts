import { NextRequest, NextResponse } from 'next/server';
import KaryakramServices from '../../services/agami-karyakram/karyakramServices';
import { uploadToS3 } from '../../controller/imageController';

const karyakramServices = new KaryakramServices();

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File | null;
        const formDataObj = Object.fromEntries(formData.entries());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const karyakramData: any = { ...formDataObj };
        
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
        
        const karyakram = await karyakramServices.createKaryakram(karyakramData);
        return NextResponse.json(karyakram);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to create karyakram' }, { status: 500 });
    }
}   

export async function GET() {
    try {
        const karyakram = await karyakramServices.getKaryakram();
        return NextResponse.json(karyakram);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to get karyakram' }, { status: 500 });
    }
}   