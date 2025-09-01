import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { RootState } from "@/lib/redux/store";
import axios from "axios";

// Gallery item interface
export interface GalleryItem {
    _id?: string;
    title: string;
    description: string;
    type: string;
    url: string;
    thumbnail: string;
    category: string;
    tags: string[];
    uploadDate: string; // ISO string
    size: number;
    dimensions: string;
    views: number;
    likes: number;
    status: "public" | "private" | "draft";
    location: string;
    event: string;
    photographer: string;
    createdOn?: string;
    updatedOn?: string;
}

interface GalleryState {
    gallery: GalleryItem[];
    loading: boolean;
    error: string | null;
}

const initialState: GalleryState = {
    gallery: [],
    loading: false,
    error: null,
};

const gallerySlice = createSlice({
    name: "gallery",
    initialState,
    reducers: {
        setGallery: (state, action: PayloadAction<GalleryItem[]>) => {
            state.gallery = action.payload;
            state.loading = false;
            state.error = null;
        },
        addGalleryItemSuccess: (state, action: PayloadAction<GalleryItem>) => {
            state.gallery.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        updateGalleryItemSuccess: (state, action: PayloadAction<GalleryItem>) => {
            const index = state.gallery.findIndex(
                (item) => item._id === action.payload._id
            );
            if (index !== -1) {
                state.gallery[index] = action.payload;
            }
            state.loading = false;
            state.error = null;
        },
        deleteGalleryItemSuccess: (state, action: PayloadAction<string>) => {
            state.gallery = state.gallery.filter(
                (item) => item._id !== action.payload
            );
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    setGallery,
    addGalleryItemSuccess,
    updateGalleryItemSuccess,
    deleteGalleryItemSuccess,
    setLoading,
    setError
} = gallerySlice.actions;

// Thunks

export const fetchGallery = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get("/api/routes/gallery");
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.data?.message || "Failed to fetch gallery items");
        }
        const gallery = response.data || [];
        dispatch(setGallery(gallery));
    } catch (error: unknown) {
        if (error instanceof Error) {
            dispatch(setError(error.message));
        } else {
            dispatch(setError("An error occurred while fetching gallery items"));
        }
    }
};

export const addGalleryItem = (galleryItem: GalleryItem) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        const formData = new FormData();
        Object.entries(galleryItem).forEach(([key, value]) => {
            formData.append(key, value as string);
        });
        const response = await axios.post("/api/routes/gallery", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.data?.message || "Failed to add gallery item");
        }

        const newGalleryItem = response.data;
        if (!newGalleryItem || !newGalleryItem._id) {
            throw new Error('Invalid response: missing gallery item data or ID');
        }

        dispatch(addGalleryItemSuccess(newGalleryItem));
    } catch (error: unknown) {
        if (error instanceof Error) {
            dispatch(setError(error.message));
        } else {
            dispatch(setError("An error occurred while adding gallery item"));
        }
    }
};

export const updateGalleryItem = (id: string, galleryItem: GalleryItem) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.put(`/api/routes/gallery/${id}`, galleryItem, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.data?.message || "Failed to update gallery item");
        }

        const updatedGalleryItem = response.data;
        if (!updatedGalleryItem || !updatedGalleryItem._id) {
            throw new Error('Invalid response: missing gallery item data or ID');
        }

        dispatch(updateGalleryItemSuccess(updatedGalleryItem));
    } catch (error: unknown) {
        if (error instanceof Error) {
            dispatch(setError(error.message));
        } else {
            dispatch(setError("An error occurred while updating gallery item"));
        }
    }
};

export const deleteGalleryItem = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.delete(`/api/routes/gallery/${id}`);
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.data?.message || "Failed to delete gallery item");
        }
        dispatch(deleteGalleryItemSuccess(id));
    } catch (error: unknown) {
        if (error instanceof Error) {
            dispatch(setError(error.message));
        } else {
            dispatch(setError("An error occurred while deleting gallery item"));
        }
    }
};

// Selectors
export const selectGallery = (state: RootState) => state.gallery.gallery;
export const selectGalleryLoading = (state: RootState) => state.gallery.loading;
export const selectGalleryError = (state: RootState) => state.gallery.error;

export default gallerySlice.reducer;
