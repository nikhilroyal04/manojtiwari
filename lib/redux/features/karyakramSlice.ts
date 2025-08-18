import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { RootState } from "@/lib/redux/store";
import axios from "axios";

export interface Karyakram {
    _id?: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    type: string;
    image: string;
    status: "upcoming" | "ongoing" | "completed" | "cancelled" | "postponed";
    expectedAttendees?: number;
    actualAttendees?: number;
    priority: "low" | "medium" | "high" | "urgent";
    organizer?: string;
    contactPerson?: string;
    contactNumber?: string;
    notes?: string;
    createdOn?: string;
    updatedOn?: string;}

interface KaryakramState {
    karyakram: Karyakram[];
    loading: boolean;
    error: string | null;
}

const initialState: KaryakramState = {
    karyakram: [],
    loading: false,
    error: null,
};

const karyakramSlice = createSlice({
    name: "karyakram",
    initialState,
    reducers: {
        setKaryakram: (state, action: PayloadAction<Karyakram[]>) => {
            state.karyakram = action.payload;
            state.loading = false;
            state.error = null;
        },
        addKaryakramSuccess: (state, action: PayloadAction<Karyakram>) => {
            state.karyakram.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        updateKaryakramSuccess: (state, action: PayloadAction<Karyakram>) => {
            const index = state.karyakram.findIndex(
                (karyakram) => karyakram._id === action.payload._id
            );
            if (index !== -1) {
                state.karyakram[index] = action.payload;
            }
            state.loading = false;
            state.error = null;
        },
        deleteKaryakramSuccess: (state, action: PayloadAction<string>) => {
            state.karyakram = state.karyakram.filter(
                (karyakram) => karyakram._id !== action.payload
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
        setKaryakram,
    addKaryakramSuccess,
    updateKaryakramSuccess,
    deleteKaryakramSuccess,
    setLoading,
    setError
} = karyakramSlice.actions;

export const fetchKaryakram = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get("/api/routes/agami-karyakram");
        // Axios always resolves unless network error, so check status
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.data?.message || "Failed to fetch karyakram");
        }
        // Extract the actual karyakram data from the response
        const karyakram = response.data || [];
        dispatch(setKaryakram(karyakram));
    } catch (error: unknown) {
        if (error instanceof Error) {
            dispatch(setError(error.message));
        } else {
            dispatch(setError("An error occurred while fetching karyakram"));
        }
    }
};

export const addKaryakram = (karyakram: Karyakram) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        console.log('Adding new karyakram:', karyakram);

        const response = await axios.post("/api/routes/agami-karyakram", karyakram, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.data?.message || "Failed to add karyakram");
        }

        // Extract the actual karyakram data from the response
        const newKaryakram = response.data;
        console.log('Add response:', newKaryakram);

        if (!newKaryakram || !newKaryakram._id) {
            throw new Error('Invalid response: missing karyakram data or ID');
        }

        dispatch(addKaryakramSuccess(newKaryakram));
    } catch (error: unknown) {
        console.error('Error adding karyakram:', error);
        if (error instanceof Error) {
            dispatch(setError(error.message));
        } else {
            dispatch(setError("An error occurred while adding karyakram"));
        }
    }
};

export const updateKaryakram = (id: string, karyakram: Karyakram) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        console.log('Updating karyakram with ID:', id, 'Data:', karyakram);

        const response = await axios.put(`/api/routes/agami-karyakram/${id}`, karyakram, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.data?.message || "Failed to update karyakram");
        }

        // Extract the actual karyakram data from the response
        const updatedKaryakram = response.data;
        console.log('Update response:', updatedKaryakram);

        if (!updatedKaryakram || !updatedKaryakram._id) {
            throw new Error('Invalid response: missing karyakram data or ID');
        }

        dispatch(updateKaryakramSuccess(updatedKaryakram));
    } catch (error: unknown) {
        console.error('Error updating karyakram:', error);
        if (error instanceof Error) {
            dispatch(setError(error.message));
        } else {
            dispatch(setError("An error occurred while updating karyakram"));
        }
    }
};

export const deleteKaryakram = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.delete(`/api/routes/agami-karyakram/${id}`);
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.data?.message || "Failed to delete karyakram");
        }
        dispatch(deleteKaryakramSuccess(id));
    } catch (error: unknown) {
        if (error instanceof Error) {
            dispatch(setError(error.message));
        } else {
            dispatch(setError("An error occurred while deleting karyakram"));
        }
    }
};

export const selectKaryakram = (state: RootState) => state.karyakram.karyakram;
export const selectLoading = (state: RootState) => state.karyakram.loading;
export const selectError = (state: RootState) => state.karyakram.error;

export default karyakramSlice.reducer;
