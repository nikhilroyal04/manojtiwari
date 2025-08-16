import { NextRequest, NextResponse } from 'next/server';
import JantaDarbarServices from '../../../services/janta-darbar/darbarServices';

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
        const jantaDarbarData = await request.json();
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