import { NextRequest, NextResponse } from 'next/server';
import GalleryServices from '../../services/gallery/galleryServices';
import Gallery from '../../models/galleryModel';

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
        const file = formData.get('url') as File;
        
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }
        
        
        // Extract form data and provide defaults for required fields
        const formDataObj = Object.fromEntries(formData.entries());
        const galleryData = {
            title: String(formDataObj.title || 'Untitled'),
            description: String(formDataObj.description || ''),
            type: String(formDataObj.type || 'image'),
            category: String(formDataObj.category || 'general'),
            tags: formDataObj.tags ? String(formDataObj.tags).split(',') : [],
            uploadDate: new Date(),
            size: file.size || 0,
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