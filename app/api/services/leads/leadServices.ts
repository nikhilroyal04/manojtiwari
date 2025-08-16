import Lead from '../../models/leadModel';  
import connectDatabase from '../../config/db';

class LeadServices {
    constructor() {
        connectDatabase();
    }

    async createLead(lead: typeof Lead) {
        try {
            const newLead = new Lead(lead);
            await newLead.save();
            return newLead;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to create lead'));
        }
    }

    async getLeads() {
        try {
            const leads = await Lead.find();
            return leads;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to get leads'));
        }
    }

    async getLeadById(id: string) {
        try {
            const lead = await Lead.findById(id);
            return lead;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to get lead by id'));
        }
    }

    async updateLead(id: string, lead: typeof Lead) {
        try {
            const updatedLead = await Lead.findByIdAndUpdate(id, lead, { new: true });
            return updatedLead;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to update lead'));
        }
    }

    async deleteLead(id: string) {
        try {
            await Lead.findByIdAndDelete(id);
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to delete lead'));
        }
    }
}

export default LeadServices;