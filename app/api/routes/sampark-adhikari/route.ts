import { NextRequest, NextResponse } from 'next/server';
import AdhikariServices from '../../services/sampark-adhikari/adhikariServices';

const adhikariServices = new AdhikariServices();

export async function GET() {
    try {
        const adhikari = await adhikariServices.getAdhikari();
        return NextResponse.json(adhikari);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }   
        return NextResponse.json({ error: 'Failed to get sampark adhikari' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const adhikariData = await request.json();
        const adhikari = await adhikariServices.createAdhikari(adhikariData);
        return NextResponse.json(adhikari);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }   
        return NextResponse.json({ error: 'Failed to create sampark adhikari' }, { status: 500 });
    }
}