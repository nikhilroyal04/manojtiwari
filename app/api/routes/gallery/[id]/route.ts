import { NextRequest, NextResponse } from 'next/server';
import GalleryServices from '../../../services/gallery/galleryServices';

const galleryServices = new GalleryServices();

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const galleryItem = await galleryServices.getGalleryItemById(id);
        return NextResponse.json(galleryItem);
    } catch (error: unknown) {
        if (error instanceof Error) {       
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to get gallery item by id' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const galleryItemData = await request.json();  
        const galleryItem = await galleryServices.updateGalleryItem(id, galleryItemData);
        return NextResponse.json(galleryItem);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to update gallery item' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await galleryServices.deleteGalleryItem(id);
        return NextResponse.json({ message: 'Gallery item deleted successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
    }
}