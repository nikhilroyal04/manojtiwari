import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { RootState } from "@/lib/redux/store";
import axios from "axios";

// ChunaviRailayan interface based on the Mongoose model and frontend usage
export interface ChunaviRailayan {
  _id?: string;
  title: string;
  description: string;
  location: string;
  state: string;
  date: string; // ISO string
  time?: string;
  expectedCrowd?: number;
  status?: string;
  priority?: string;
  campaignType?: string;
  targetAudience?: string[];
  keySpeakers?: string[];
  budget?: number;
  actualCrowd?: number;
  feedback?: string;
  photos?: string[];
  images?: string[];
  mainImage: string;
  videos?: string[];
  createdOn?: string;
  updatedOn?: string;
  existingImages?: string[]; // For edit: existing images to keep
}

interface ChunaviRailayanState {
  railayan: ChunaviRailayan[];
  loading: boolean;
  error: string | null;
}

const initialState: ChunaviRailayanState = {
  railayan: [],
  loading: false,
  error: null,
};

const railayanSlice = createSlice({
  name: "railayan",
  initialState,
  reducers: {
    setRailayan: (state, action: PayloadAction<ChunaviRailayan[]>) => {
      state.railayan = action.payload;
      state.loading = false;
      state.error = null;
    },
    addRailayanSuccess: (state, action: PayloadAction<ChunaviRailayan>) => {
      state.railayan.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateRailayanSuccess: (state, action: PayloadAction<ChunaviRailayan>) => {
      const index = state.railayan.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.railayan[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    deleteRailayanSuccess: (state, action: PayloadAction<string>) => {
      state.railayan = state.railayan.filter(
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
  setRailayan,
  addRailayanSuccess,
  updateRailayanSuccess,
  deleteRailayanSuccess,
  setLoading,
  setError,
} = railayanSlice.actions;

// Fetch all Chunavi Railayan posts
export const fetchRailayan = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get("/api/routes/chunavi-railayan");
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.data?.message || "Failed to fetch Chunavi Railayan");
    }
    const railayan = response.data || [];
    dispatch(setRailayan(railayan));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(setError(error.message));
    } else {
      dispatch(setError("An error occurred while fetching Chunavi Railayan"));
    }
  }
};

// Add a new Chunavi Railayan post
export const addRailayan = (railayan: ChunaviRailayan, files?: File[] | File | null) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const formData = new FormData();
    
    // Add all form fields
    Object.entries(railayan).forEach(([key, value]) => {
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

    const response = await axios.post("/api/routes/chunavi-railayan", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.data?.message || "Failed to add Chunavi Railayan");
    }
    const newRailayan = response.data;
    if (!newRailayan || !newRailayan._id) {
      throw new Error("Invalid response: missing Chunavi Railayan data or ID");
    }
    dispatch(addRailayanSuccess(newRailayan));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(setError(error.message));
    } else {
      dispatch(setError("An error occurred while adding Chunavi Railayan"));
    }
  }
};

// Update a Chunavi Railayan post
export const updateRailayan = (id: string, railayan: ChunaviRailayan, files?: File[] | File | null) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    let response;
    
    // Always use FormData if we have files or existingImages to manage
    if (files || railayan.existingImages) {
      const formData = new FormData();
      
      // Add all form fields
      Object.entries(railayan).forEach(([key, value]) => {
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

      response = await axios.put(`/api/routes/chunavi-railayan/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      response = await axios.put(`/api/routes/chunavi-railayan/${id}`, railayan, {
        headers: { "Content-Type": "application/json" },
      });
    }
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.data?.message || "Failed to update Chunavi Railayan");
    }
    const updatedRailayan = response.data;
    if (!updatedRailayan || !updatedRailayan._id) {
      throw new Error("Invalid response: missing Chunavi Railayan data or ID");
    }
    dispatch(updateRailayanSuccess(updatedRailayan));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(setError(error.message));
    } else {
      dispatch(setError("An error occurred while updating Chunavi Railayan"));
    }
  }
};

// Delete a Chunavi Railayan post
export const deleteRailayan = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.delete(`/api/routes/chunavi-railayan/${id}`);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.data?.message || "Failed to delete Chunavi Railayan");
    }
    dispatch(deleteRailayanSuccess(id));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(setError(error.message));
    } else {
      dispatch(setError("An error occurred while deleting Chunavi Railayan"));
    }
  }
};

// Selectors
export const selectRailayan = (state: RootState) => state.railayan.railayan;
export const selectRailayanLoading = (state: RootState) => state.railayan.loading;
export const selectRailayanError = (state: RootState) => state.railayan.error;

export default railayanSlice.reducer;
