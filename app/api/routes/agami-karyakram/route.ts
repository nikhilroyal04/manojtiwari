import { NextRequest, NextResponse } from 'next/server';
import KaryakramServices from '../../services/agami-karyakram/karyakramServices';

const karyakramServices = new KaryakramServices();

export async function POST(request: NextRequest) {
    try {
        const karyakramData = await request.json();
        const karyakram = await karyakramServices.createKaryakram(karyakramData);
        return NextResponse.json(karyakram);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to create karyakram' }, { status: 500 });
    }
}   

export async function GET() {
    try {
        const karyakram = await karyakramServices.getKaryakram();
        return NextResponse.json(karyakram);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to get karyakram' }, { status: 500 });
    }
}   