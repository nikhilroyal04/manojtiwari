import { NextRequest, NextResponse } from 'next/server';
import ChunaviRailayanServices from '../../services/chunavi-railayan/railayanServices';
import { uploadToS3 } from '../../controller/imageController';

const chunaviRailayanServices = new ChunaviRailayanServices();

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        
        // Get all image files (support multiple images)
        const imageFiles: File[] = [];
        formData.forEach((value, key) => {
            if (key.startsWith('image') && value instanceof File) {
                imageFiles.push(value);
            }
        });
        
        // Get other form data (excluding image files)
        const formDataObj: Record<string, unknown> = {};
        formData.forEach((value, key) => {
            if (!key.startsWith('image')) {
                formDataObj[key] = value;
            }
        });
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const chunaviRailayanData: any = { ...formDataObj };
        
        if (imageFiles.length > 0) {
            // Upload all images to S3
            const uploadedUrls: string[] = [];
            
            for (const file of imageFiles) {
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
                uploadedUrls.push(uploaded.url);
            }
            
            // First image is mainImage, all images in array
            chunaviRailayanData.mainImage = uploadedUrls[0];
            chunaviRailayanData.images = uploadedUrls;
        } else {
            // If no image provided, use a default placeholder
            chunaviRailayanData.mainImage = '/images/chunavi-railayan/default-rally.jpg';
            chunaviRailayanData.images = ['/images/chunavi-railayan/default-rally.jpg'];
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