import { NextRequest, NextResponse } from 'next/server';
import GalleryServices from '../../services/gallery/galleryServices';

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
        const galleryItemData = await request.json();
        const newGalleryItem = await galleryServices.createGalleryItem(galleryItemData);
        return NextResponse.json(newGalleryItem);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }   
        return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
    }
}