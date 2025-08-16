import { NextRequest, NextResponse } from 'next/server';
import JantaDarbarServices from '../../services/janta-darbar/darbarServices';

const jantaDarbarServices = new JantaDarbarServices();

export async function POST(request: NextRequest) {
    try {
        const jantaDarbarData = await request.json();
        const jantaDarbar = await jantaDarbarServices.createJantaDarbar(jantaDarbarData);
        return NextResponse.json(jantaDarbar);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to create Janta Darbar event' }, { status: 500 });
    }
}   

export async function GET() {
    try {
        const jantaDarbars = await jantaDarbarServices.getJantaDarbars();
        return NextResponse.json(jantaDarbars);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to get Janta Darbar events' }, { status: 500 });
    }
}   