import { NextRequest, NextResponse } from 'next/server';
import LeadServices from '../../services/leads/leadServices';

const leadServices = new LeadServices();

export async function POST(request: NextRequest) {
    try {
        const leadData = await request.json();
        const lead = await leadServices.createLead(leadData);
        return NextResponse.json(lead);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
    }
}   

export async function GET() {
    try {
        const leads = await leadServices.getLeads();
        return NextResponse.json(leads);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to get leads' }, { status: 500 });
    }
}   