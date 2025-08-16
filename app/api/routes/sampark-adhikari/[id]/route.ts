import { NextRequest, NextResponse } from 'next/server';
import AdhikariServices from '../../../services/sampark-adhikari/adhikariServices';

const adhikariServices = new AdhikariServices();

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const adhikari = await adhikariServices.getAdhikariById(id);
        return NextResponse.json(adhikari);
    } catch (error: unknown) {
        if (error instanceof Error) {       
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to get adhikari by id' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const adhikariData = await request.json();  
        const adhikari = await adhikariServices.updateAdhikari(id, adhikariData);
        return NextResponse.json(adhikari);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to update adhikari' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await adhikariServices.deleteAdhikari(id);
        return NextResponse.json({ message: 'Adhikari deleted successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to delete adhikari' }, { status: 500 });
    }
}