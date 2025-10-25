import { NextRequest, NextResponse } from 'next/server';
import ChunaviRailayanServices from '../../services/chunavi-railayan/railayanServices';
import { uploadToS3 } from '../../controller/imageController';

const chunaviRailayanServices = new ChunaviRailayanServices();

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File | null;
        const formDataObj = Object.fromEntries(formData.entries());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const chunaviRailayanData: any = { ...formDataObj };
        
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
        
        const chunaviRailayan = await chunaviRailayanServices.createChunaviRailayan(chunaviRailayanData);
        return NextResponse.json(chunaviRailayan);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to create chunavi railayan' }, { status: 500 });
    }
}       

export async function GET() {
    try {
        const chunaviRailayan = await chunaviRailayanServices.getChunaviRailayan();
        return NextResponse.json(chunaviRailayan);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to get chunavi railayan' }, { status: 500 });
    }
}