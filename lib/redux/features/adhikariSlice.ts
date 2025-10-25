import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { RootState } from "@/lib/redux/store";
import axios from "axios";

export interface Adhikari {
    _id?: string;
    name: string;
    email?: string;
    number: string;
    officeNumber?: string;
    workArea: string;
    additionalInfo?: string;
    department?: string;
    image?: string;
    status: "ACTIVE" | "INACTIVE" | "ON_LEAVE" | "RESIGNED";
    designation?: string;
    joiningDate?: string;
    experience: number;
    qualification?: string;
    address?: string;
    emergencyContact?: string;
}

interface AdhikariState {
    adhikari: Adhikari[];
    loading: boolean;
    error: string | null;
}

const initialState: AdhikariState = {
    adhikari: [],
    loading: false,
    error: null,
};

const adhikariSlice = createSlice({
    name: "adhikari",
    initialState,
    reducers: {
        setAdhikari: (state, action: PayloadAction<Adhikari[]>) => {
            state.adhikari = action.payload;
            state.loading = false;
            state.error = null;
        },
        addAdhikariSuccess: (state, action: PayloadAction<Adhikari>) => {
            state.adhikari.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        updateAdhikariSuccess: (state, action: PayloadAction<Adhikari>) => {
            const index = state.adhikari.findIndex(
                (adhikari) => adhikari._id === action.payload._id
            );
            if (index !== -1) {
                state.adhikari[index] = action.payload;
            }
            state.loading = false;
            state.error = null;
        },
        deleteAdhikariSuccess: (state, action: PayloadAction<string>) => {
            state.adhikari = state.adhikari.filter(
                (adhikari) => adhikari._id !== action.payload
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
    setAdhikari,
    addAdhikariSuccess,
    updateAdhikariSuccess,
    deleteAdhikariSuccess,
    setLoading,
    setError
} = adhikariSlice.actions;

export const fetchAdhikari = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get("/api/routes/sampark-adhikari");
        // Axios always resolves unless network error, so check status
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.data?.message || "Failed to fetch adhikari");
        }
        // Extract the actual adhikari data from the response
        const adhikari = response.data || [];
        dispatch(setAdhikari(adhikari));
    } catch (error: unknown) {
        if (error instanceof Error) {
            dispatch(setError(error.message));
        } else {
            dispatch(setError("An error occurred while fetching adhikari"));
        }
    }
};

export const addAdhikari = (adhikari: Adhikari, file?: File | null) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        console.log('Adding new adhikari:', adhikari);

        const formData = new FormData();
        Object.entries(adhikari).forEach(([key, value]) => {
            if (key === "image" && file) {
                formData.append("image", file);
            } else if (typeof value === "string") {
                formData.append(key, value);
            } else if (Array.isArray(value)) {
                formData.append(key, value.join(","));
            } else if (value != null) {
                formData.append(key, String(value));
            }
        });

        const response = await axios.post("/api/routes/sampark-adhikari", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.data?.message || "Failed to add adhikari");
        }

        // Extract the actual adhikari data from the response
        const newAdhikari = response.data;
        console.log('Add response:', newAdhikari);

        if (!newAdhikari || !newAdhikari._id) {
            throw new Error('Invalid response: missing adhikari data or ID');
        }

        dispatch(addAdhikariSuccess(newAdhikari));
    } catch (error: unknown) {
        console.error('Error adding adhikari:', error);
        if (error instanceof Error) {
            dispatch(setError(error.message));
        } else {
            dispatch(setError("An error occurred while adding adhikari"));
        }
    }
};

export const updateAdhikari = (id: string, adhikari: Adhikari, file?: File | null) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        console.log('Updating adhikari with ID:', id, 'Data:', adhikari);

        let response;
        if (file) {
            const formData = new FormData();
            Object.entries(adhikari).forEach(([key, value]) => {
                if (key === "image" && file) {
                    formData.append("image", file);
                } else if (typeof value === "string") {
                    formData.append(key, value);
                } else if (Array.isArray(value)) {
                    formData.append(key, value.join(","));
                } else if (value != null) {
                    formData.append(key, String(value));
                }
            });
            response = await axios.put(`/api/routes/sampark-adhikari/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        } else {
            response = await axios.put(`/api/routes/sampark-adhikari/${id}`, adhikari, {
                headers: { "Content-Type": "application/json" },
            });
        }

        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.data?.message || "Failed to update adhikari");
        }

        // Extract the actual adhikari data from the response
        const updatedAdhikari = response.data;
        console.log('Update response:', updatedAdhikari);

        if (!updatedAdhikari || !updatedAdhikari._id) {
            throw new Error('Invalid response: missing adhikari data or ID');
        }

        dispatch(updateAdhikariSuccess(updatedAdhikari));
    } catch (error: unknown) {
        console.error('Error updating adhikari:', error);
        if (error instanceof Error) {
            dispatch(setError(error.message));
        } else {
            dispatch(setError("An error occurred while updating adhikari"));
        }
    }
};

export const deleteAdhikari = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.delete(`/api/routes/sampark-adhikari/${id}`);
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.data?.message || "Failed to delete adhikari");
        }
        dispatch(deleteAdhikariSuccess(id));
    } catch (error: unknown) {
        if (error instanceof Error) {
            dispatch(setError(error.message));
        } else {
            dispatch(setError("An error occurred while deleting adhikari"));
        }
    }
};

export const selectAdhikari = (state: RootState) => state.adhikari.adhikari;
export const selectLoading = (state: RootState) => state.adhikari.loading;
export const selectError = (state: RootState) => state.adhikari.error;

export default adhikariSlice.reducer;
