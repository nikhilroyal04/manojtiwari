import connectDatabase from "../../config/db";
import Gallery from "../../models/galleryModel";

class GalleryServices {
    constructor() {
        connectDatabase();
    }

    async createGalleryItem(galleryItem: typeof Gallery) {
        try {
            const newGalleryItem = new Gallery(galleryItem);
            await newGalleryItem.save();
            return newGalleryItem;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to create gallery item'));
        }
    }

    async getGalleryItems() {       
        try {
            const galleryItems = await Gallery.find();
            return galleryItems;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to get gallery items'));
        }
    }

    async getGalleryItemById(id: string) {
        try {
            const galleryItem = await Gallery.findById(id);
            return galleryItem;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to get gallery item by id'));
        }
    }

    async updateGalleryItem(id: string, galleryItem: typeof Gallery) {
        try {
            const updatedGalleryItem = await Gallery.findByIdAndUpdate(id, galleryItem, { new: true });
            return updatedGalleryItem;
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to update gallery item'));
        }
    }

    async deleteGalleryItem(id: string) {
        try {
            await Gallery.findByIdAndDelete(id);
        } catch (error: unknown) {
            throw new Error((error instanceof Error ? error.message : 'Failed to delete gallery item'));
        }
    }
}   

export default GalleryServices;