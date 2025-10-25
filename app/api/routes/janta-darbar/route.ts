import { NextRequest, NextResponse } from 'next/server';
import JantaDarbarServices from '../../services/janta-darbar/darbarServices';
import { uploadToS3 } from '../../controller/imageController';

const jantaDarbarServices = new JantaDarbarServices();

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
        const jantaDarbarData: any = { ...formDataObj };
        
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
            jantaDarbarData.mainImage = uploadedUrls[0];
            jantaDarbarData.images = uploadedUrls;
        } else {
            // If no image provided, use a default placeholder
            jantaDarbarData.mainImage = '/images/janta-darbar/default-darbar.jpg';
            jantaDarbarData.images = ['/images/janta-darbar/default-darbar.jpg'];
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