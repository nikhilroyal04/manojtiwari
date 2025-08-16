import { NextRequest, NextResponse } from 'next/server';
import ChunaviRailayanServices from '../../../services/chunavi-railayan/railayanServices';

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
        const chunaviRailayanData = await request.json();
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