import connectDatabase from "../../config/db";
import Karyakram from "../../models/karyakram";

class KaryakramServices {
    async createKaryakram(karyakram: typeof Karyakram) {
        try {
            await connectDatabase();
            const newKaryakram = new Karyakram(karyakram);      
            await newKaryakram.save();
            return newKaryakram;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to create karyakram'));
        }
    }

    async getKaryakram() {
        try {
            await connectDatabase();
            const karyakram = await Karyakram.find();       
            return karyakram;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to get karyakram'));
        }
    }

    async getKaryakramById(id: string) {
        try {
            await connectDatabase();
            const karyakram = await Karyakram.findById(id);
            return karyakram;   
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to get karyakram by id'));
        }
    }

    async updateKaryakram(id: string, karyakram: typeof Karyakram) {
        try {
            await connectDatabase();
            const updatedKaryakram = await Karyakram.findByIdAndUpdate(id, karyakram, { new: true });
            return updatedKaryakram;    
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to update karyakram'));
        }
    }

    async deleteKaryakram(id: string) {
        try {
            await connectDatabase();
            await Karyakram.findByIdAndDelete(id);
        } catch (error: unknown) {  
            throw new Error((error instanceof Error ? error.message : 'Failed to delete karyakram'));
        }
    }
}

export default KaryakramServices;