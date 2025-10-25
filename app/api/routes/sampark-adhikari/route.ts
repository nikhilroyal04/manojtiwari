import { NextRequest, NextResponse } from 'next/server';
import AdhikariServices from '../../services/sampark-adhikari/adhikariServices';
import { uploadToS3 } from '../../controller/imageController';

const adhikariServices = new AdhikariServices();

export async function GET() {
    try {
        const adhikari = await adhikariServices.getAdhikari();
        return NextResponse.json(adhikari);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }   
        return NextResponse.json({ error: 'Failed to get sampark adhikari' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File | null;
        const formDataObj = Object.fromEntries(formData.entries());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const adhikariData: any = { ...formDataObj };
        
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
        
        const adhikari = await adhikariServices.createAdhikari(adhikariData);
        return NextResponse.json(adhikari);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }   
        return NextResponse.json({ error: 'Failed to create sampark adhikari' }, { status: 500 });
    }
}