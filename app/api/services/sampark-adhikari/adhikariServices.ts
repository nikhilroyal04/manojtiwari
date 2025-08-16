import connectDatabase from "../../config/db";
import Adhikari from "../../models/adhikariModel";

class AdhikariServices {
    constructor() {
        connectDatabase();
    }

    async createAdhikari(adhikari: typeof Adhikari) {
        try {
            const newAdhikari = new Adhikari(adhikari);
            await newAdhikari.save();
            return newAdhikari;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to create adhikari'));
        }
    }

    async getAdhikari() {       
        try {
            const adhikari = await Adhikari.find();
            return adhikari;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to get adhikari'));
        }
    }

    async getAdhikariById(id: string) {
        try {
            const adhikari = await Adhikari.findById(id);
            return adhikari;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to get adhikari by id'));
        }
    }

    async updateAdhikari(id: string, adhikari: typeof Adhikari) {
        try {
            const updatedAdhikari = await Adhikari.findByIdAndUpdate(id, adhikari, { new: true });
            return updatedAdhikari;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to update adhikari'));
        }
    }

    async deleteAdhikari(id: string) {
        try {
            await Adhikari.findByIdAndDelete(id);
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to delete adhikari'));
        }
    }
}   

export default AdhikariServices;