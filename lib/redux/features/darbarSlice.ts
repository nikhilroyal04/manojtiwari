import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { RootState } from "@/lib/redux/store";
import axios from "axios";

// Janta Darbar Event interface
export interface JantaDarbar {
    _id?: string;
    title: string;
    agenda: string;
    date: string;
    location: string;
    status: "open" | "close" | "ongoing";
    images?: string[];
    mainImage?: string;
    attendees?: number;
    issues?: number;
    resolved?: number;
    existingImages?: string[]; // For edit: existing images to keep
    [key: string]: unknown;
}

interface JantaDarbarState {
    darbars: JantaDarbar[];
    loading: boolean;
    error: string | null;
}

const initialState: JantaDarbarState = {
    darbars: [],
    loading: false,
    error: null,
};

const jantaDarbarSlice = createSlice({
    name: "jantaDarbar",
    initialState,
    reducers: {
        setDarbars: (state, action: PayloadAction<JantaDarbar[]>) => {
            state.darbars = action.payload;
            state.loading = false;
            state.error = null;
        },
        addDarbarSuccess: (state, action: PayloadAction<JantaDarbar>) => {
            state.darbars.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        updateDarbarSuccess: (state, action: PayloadAction<JantaDarbar>) => {
            const index = state.darbars.findIndex(
                (darbar) => darbar._id === action.payload._id
            );
            if (index !== -1) {
                state.darbars[index] = action.payload;
            }
            state.loading = false;
            state.error = null;
        },
        deleteDarbarSuccess: (state, action: PayloadAction<string>) => {
            state.darbars = state.darbars.filter(
                (darbar) => darbar._id !== action.payload
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
    setDarbars,
    addDarbarSuccess,
    updateDarbarSuccess,
    deleteDarbarSuccess,
    setLoading,
    setError
} = jantaDarbarSlice.actions;

// Fetch all Janta Darbar events
export const fetchDarbars = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get("/api/routes/janta-darbar");
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.data?.error || "Failed to fetch Janta Darbar events");
        }
        const darbars = response.data || [];
        dispatch(setDarbars(darbars));
    } catch (error: unknown) {
        if (error instanceof Error) {
            dispatch(setError(error.message));
        } else {
            dispatch(setError("An error occurred while fetching Janta Darbar events"));
        }
    }
};

// Add a new Janta Darbar event
export const addDarbar = (darbar: JantaDarbar, files?: File[] | File | null) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        const formData = new FormData();
        
        // Add all form fields
        Object.entries(darbar).forEach(([key, value]) => {
            if (key !== "image" && key !== "images" && key !== "mainImage") {
                if (typeof value === "string") {
                    formData.append(key, value);
                } else if (Array.isArray(value)) {
                    formData.append(key, value.join(","));
                } else if (value != null) {
                    formData.append(key, String(value));
                }
            }
        });

        // Add multiple image files
        if (files) {
            const fileArray = Array.isArray(files) ? files : [files];
            fileArray.forEach((file, index) => {
                formData.append(`image${index}`, file);
            });
        }

        const response = await axios.post("/api/routes/janta-darbar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.data?.error || "Failed to add Janta Darbar event");
        }

        const newDarbar = response.data;
        if (!newDarbar || !newDarbar._id) {
            throw new Error('Invalid response: missing Janta Darbar event data or ID');
        }

        dispatch(addDarbarSuccess(newDarbar));
    } catch (error: unknown) {
        if (error instanceof Error) {
            dispatch(setError(error.message));
        } else {
            dispatch(setError("An error occurred while adding Janta Darbar event"));
        }
    }
};

// Update an existing Janta Darbar event
export const updateDarbar = (id: string, darbar: JantaDarbar, files?: File[] | File | null) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        let response;
        
        // Always use FormData if we have files or existingImages to manage
        if (files || darbar.existingImages) {
            const formData = new FormData();
            
            // Add all form fields
            Object.entries(darbar).forEach(([key, value]) => {
                if (key !== "image" && key !== "images" && key !== "mainImage") {
                    if (typeof value === "string") {
                        formData.append(key, value);
                    } else if (Array.isArray(value)) {
                        // Send array as comma-separated string
                        formData.append(key, value.join(","));
                    } else if (value != null) {
                        formData.append(key, String(value));
                    }
                }
            });

            // Add multiple image files if provided
            if (files) {
                const fileArray = Array.isArray(files) ? files : [files];
                fileArray.forEach((file, index) => {
                    formData.append(`image${index}`, file);
                });
            }

            response = await axios.put(`/api/routes/janta-darbar/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        } else {
            response = await axios.put(`/api/routes/janta-darbar/${id}`, darbar, {
                headers: { "Content-Type": "application/json" },
            });
        }

        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.data?.error || "Failed to update Janta Darbar event");
        }

        const updatedDarbar = response.data;
        if (!updatedDarbar || !updatedDarbar._id) {
            throw new Error('Invalid response: missing Janta Darbar event data or ID');
        }

        dispatch(updateDarbarSuccess(updatedDarbar));
    } catch (error: unknown) {
        if (error instanceof Error) {
            dispatch(setError(error.message));
        } else {
            dispatch(setError("An error occurred while updating Janta Darbar event"));
        }
    }
};

// Delete a Janta Darbar event
export const deleteDarbar = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.delete(`/api/routes/janta-darbar/${id}`);
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.data?.error || "Failed to delete Janta Darbar event");
        }
        dispatch(deleteDarbarSuccess(id));
    } catch (error: unknown) {
        if (error instanceof Error) {
            dispatch(setError(error.message));
        } else {
            dispatch(setError("An error occurred while deleting Janta Darbar event"));
        }
    }
};

export const selectDarbars = (state: RootState) => state.jantaDarbar.darbars;
export const selectDarbarLoading = (state: RootState) => state.jantaDarbar.loading;
export const selectDarbarError = (state: RootState) => state.jantaDarbar.error;

export default jantaDarbarSlice.reducer;
