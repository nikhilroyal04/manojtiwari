import JantaDarbar from '../../models/darbarModel';  
import connectDatabase from '../../config/db';

class JantaDarbarServices {
    async createJantaDarbar(jantaDarbar: typeof JantaDarbar) {
        try {
            await connectDatabase();
            const newJantaDarbar = new JantaDarbar(jantaDarbar);
            await newJantaDarbar.save();
            return newJantaDarbar;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to create Janta Darbar event'));
        }
    }

    async getJantaDarbars() {
        try {
            await connectDatabase();
            const jantaDarbars = await JantaDarbar.find();
            return jantaDarbars;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to get Janta Darbar events'));
        }
    }

    async getJantaDarbarById(id: string) {
        try {
            await connectDatabase();
            const jantaDarbar = await JantaDarbar.findById(id);
            return jantaDarbar;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to get Janta Darbar event by id'));
        }
    }

    async updateJantaDarbar(id: string, jantaDarbar: typeof JantaDarbar) {
        try {
            await connectDatabase();
            const updatedJantaDarbar = await JantaDarbar.findByIdAndUpdate(id, jantaDarbar, { new: true });
            return updatedJantaDarbar;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to update Janta Darbar event'));
        }
    }

    async deleteJantaDarbar(id: string) {
        try {
            await connectDatabase();
            await JantaDarbar.findByIdAndDelete(id);
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to delete Janta Darbar event'));
        }
    }
}

export default JantaDarbarServices;