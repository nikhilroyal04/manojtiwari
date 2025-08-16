import { NextRequest, NextResponse } from 'next/server';
import ChunaviRailayanServices from '../../services/chunavi-railayan/railayanServices';

const chunaviRailayanServices = new ChunaviRailayanServices();

export async function POST(request: NextRequest) {
    try {
        const chunaviRailayanData = await request.json();
        const chunaviRailayan = await chunaviRailayanServices.createChunaviRailayan(chunaviRailayanData);
        return NextResponse.json(chunaviRailayan);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to create chunavi railayan' }, { status: 500 });
    }
}       

export async function GET() {
    try {
        const chunaviRailayan = await chunaviRailayanServices.getChunaviRailayan();
        return NextResponse.json(chunaviRailayan);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to get chunavi railayan' }, { status: 500 });
    }
}