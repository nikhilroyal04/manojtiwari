import { NextRequest, NextResponse } from 'next/server';
import GalleryServices from '../../services/gallery/galleryServices';
import Gallery from '../../models/galleryModel';
import { uploadToS3 } from '../../controller/imageController';

const galleryServices = new GalleryServices();

export async function GET() {
    try {
        const galleryItems = await galleryServices.getGalleryItems();
        return NextResponse.json(galleryItems);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }   
        return NextResponse.json({ error: 'Failed to get gallery items' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('url') as File | null;
        
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Convert File to Multer-like file object
        const buffer = Buffer.from(await file.arrayBuffer());
        const multerFile = {
            fieldname: 'url',
            originalname: file.name,
            encoding: '7bit',
            mimetype: file.type,
            buffer: buffer,
            size: file.size
        } as Express.Multer.File;

        const uploaded = await uploadToS3(multerFile);
        // Extract form data and provide defaults for required fields
        const formDataObj = Object.fromEntries(formData.entries());
        const galleryData = {
            title: String(formDataObj.title || 'Untitled'),
            description: String(formDataObj.description || ''),
            type: String(formDataObj.type || 'image'),
            category: String(formDataObj.category || 'general'),
            tags: formDataObj.tags ? String(formDataObj.tags).split(',') : [],
            uploadDate: new Date(),
            url: uploaded.url,
            thumbnail: uploaded.url,
            size: uploaded.size,
            dimensions: String(formDataObj.dimensions || 'unknown'),
            location: String(formDataObj.location || ''),
            event: String(formDataObj.event || ''),
            photographer: String(formDataObj.photographer || 'Unknown'),
            status: 'public'
        };
        
        const newGalleryItem = await galleryServices.createGalleryItem(galleryData as unknown as typeof Gallery);

        return NextResponse.json(newGalleryItem);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }   
        return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
    }
}