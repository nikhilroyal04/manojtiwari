import connectDatabase from "../../config/db";
import ChunaviRailayan from "../../models/railayan";

class ChunaviRailayanServices {
    async createChunaviRailayan(chunaviRailayan: typeof ChunaviRailayan) {
        try {
            await connectDatabase();
            const newChunaviRailayan = new ChunaviRailayan(chunaviRailayan);
            await newChunaviRailayan.save();
            return newChunaviRailayan;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to create chunavi railayan'));
        }
    }

    async getChunaviRailayan() {
        try {
            await connectDatabase();
            const chunaviRailayan = await ChunaviRailayan.find();
            return chunaviRailayan;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to get chunavi railayan'));
        }
    }

    async getChunaviRailayanById(id: string) {
        try {
            await connectDatabase();
            const chunaviRailayan = await ChunaviRailayan.findById(id);
            return chunaviRailayan;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to get chunavi railayan by id'));
        }
    }

    async updateChunaviRailayan(id: string, chunaviRailayan: typeof ChunaviRailayan) {
        try {
            await connectDatabase();
            const updatedChunaviRailayan = await ChunaviRailayan.findByIdAndUpdate(id, chunaviRailayan, { new: true });
            return updatedChunaviRailayan;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to update chunavi railayan'));
        }
    }

    async deleteChunaviRailayan(id: string) {
        try {
            await connectDatabase();
            await ChunaviRailayan.findByIdAndDelete(id);
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to delete chunavi railayan'));
        }
    }
}   

export default ChunaviRailayanServices;