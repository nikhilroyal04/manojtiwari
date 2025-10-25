import { NextRequest, NextResponse } from 'next/server';
import GalleryServices from '../../../services/gallery/galleryServices';
import { uploadToS3 } from '../../../controller/imageController';

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let body: any;
        const contentType = request.headers.get('content-type') || '';
        if (contentType.includes('multipart/form-data')) {
            const formData = await request.formData();
            const file = formData.get('url') as File | null;
            const formDataObj = Object.fromEntries(formData.entries());
            body = {
                ...formDataObj,
                tags: formDataObj.tags ? String(formDataObj.tags).split(',') : [],
            };
            if (file) {
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
                body.url = uploaded.url;
                body.thumbnail = uploaded.url;
                body.size = uploaded.size;
            }
        } else {
            body = await request.json();
        }
        const galleryItem = await galleryServices.updateGalleryItem(id, body);
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