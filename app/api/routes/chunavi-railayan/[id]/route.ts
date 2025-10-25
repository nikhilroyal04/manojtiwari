import { NextRequest, NextResponse } from 'next/server';
import ChunaviRailayanServices from '../../../services/chunavi-railayan/railayanServices';
import { uploadToS3 } from '../../../controller/imageController';

const chunaviRailayanServices = new ChunaviRailayanServices();

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const chunaviRailayan = await chunaviRailayanServices.getChunaviRailayanById(id);
        return NextResponse.json(chunaviRailayan);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to get chunavi railayan by id' }, { status: 500 });
    }
}   

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let chunaviRailayanData: any;
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
            
            chunaviRailayanData = { ...formDataObj };
            
            // Get existing images to keep (sent from frontend)
            const existingImages = chunaviRailayanData.existingImages 
                ? (typeof chunaviRailayanData.existingImages === 'string' 
                    ? chunaviRailayanData.existingImages.split(',').filter((url: string) => url.trim())
                    : chunaviRailayanData.existingImages)
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
                chunaviRailayanData.mainImage = finalImages[0];
                chunaviRailayanData.images = finalImages;
            }
            
            // Remove existingImages field as it's not part of the schema
            delete chunaviRailayanData.existingImages;
        } else {
            chunaviRailayanData = await request.json();
        }
        
        const chunaviRailayan = await chunaviRailayanServices.updateChunaviRailayan(id, chunaviRailayanData);
        return NextResponse.json(chunaviRailayan);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to update chunavi railayan' }, { status: 500 });
    }
}   

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await chunaviRailayanServices.deleteChunaviRailayan(id);
        return NextResponse.json({ message: 'Chunavi railayan deleted successfully' });
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to delete chunavi railayan' }, { status: 500 });
    }
}   