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
            
            jantaDarbarData = { ...formDataObj };
            
            // Get existing images to keep (sent from frontend)
            const existingImages = jantaDarbarData.existingImages 
                ? (typeof jantaDarbarData.existingImages === 'string' 
                    ? jantaDarbarData.existingImages.split(',').filter((url: string) => url.trim())
                    : jantaDarbarData.existingImages)
                : [];
            
            // Upload new images to S3
            const uploadedUrls: string[] = [];
            if (imageFiles.length > 0) {
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
            }
            
            // Combine existing images (that should be kept) + newly uploaded images
            const finalImages = [...existingImages, ...uploadedUrls];
            
            if (finalImages.length > 0) {
                // First image from final array is mainImage
                jantaDarbarData.mainImage = finalImages[0];
                jantaDarbarData.images = finalImages;
            }
            
            // Remove existingImages field as it's not part of the schema
            delete jantaDarbarData.existingImages;
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