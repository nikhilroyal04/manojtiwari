import { NextRequest, NextResponse } from 'next/server';
import KaryakramServices from '../../../services/agami-karyakram/karyakramServices';

const karyakramServices = new KaryakramServices();

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const karyakram = await karyakramServices.getKaryakramById(id);
        return NextResponse.json(karyakram);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to get karyakram by id' }, { status: 500 });
    }
}           

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const karyakramData = await request.json();
        const karyakram = await karyakramServices.updateKaryakram(id, karyakramData);
        return NextResponse.json(karyakram);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to update karyakram' }, { status: 500 });
    }
}       

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {           
    try {
        const { id } = await params;
        await karyakramServices.deleteKaryakram(id);
        return NextResponse.json({ message: 'Karyakram deleted successfully' });
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }       
        return NextResponse.json({ error: 'Failed to delete karyakram' }, { status: 500 });
    }
}   