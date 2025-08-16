import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { RootState } from "@/lib/redux/store";
import axios from "axios";

export interface Lead {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  priority: "low" | "medium" | "high";
  notes?: string;
  createdOn?: string;
  updatedOn?: string;
}

interface LeadState {
  leads: Lead[];
  loading: boolean;
  error: string | null;
}

const initialState: LeadState = {
  leads: [],
  loading: false,
  error: null,
};

const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setLeads: (state, action: PayloadAction<Lead[]>) => {
      state.leads = action.payload;
      state.loading = false;
      state.error = null;
    },
    addLeadSuccess: (state, action: PayloadAction<Lead>) => {
      state.leads.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateLeadSuccess: (state, action: PayloadAction<Lead>) => {
      const index = state.leads.findIndex(
        (lead) => lead._id === action.payload._id
      );
      if (index !== -1) {
        state.leads[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    deleteLeadSuccess: (state, action: PayloadAction<string>) => {
      state.leads = state.leads.filter(
        (lead) => lead._id !== action.payload
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
  setLeads, 
  addLeadSuccess, 
  updateLeadSuccess, 
  deleteLeadSuccess, 
  setLoading, 
  setError 
} = leadSlice.actions;

export const fetchLeads = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get("/api/routes/leads");
    // Axios always resolves unless network error, so check status
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.data?.message || "Failed to fetch leads");
    }
    // Extract the actual leads data from the response
    const leads = response.data || [];
    dispatch(setLeads(leads));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(setError(error.message));
    } else {
      dispatch(setError("An error occurred while fetching leads"));
    }
  }
};

export const addLead = (lead: Lead) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log('Adding new lead:', lead);
    
    const response = await axios.post("/api/routes/leads", lead, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.data?.message || "Failed to add lead");
    }
    
    // Extract the actual lead data from the response
    const newLead = response.data;
    console.log('Add response:', newLead);
    
    if (!newLead || !newLead._id) {
      throw new Error('Invalid response: missing lead data or ID');
    }
    
    dispatch(addLeadSuccess(newLead));
  } catch (error: unknown) {
    console.error('Error adding lead:', error);
    if (error instanceof Error) {
      dispatch(setError(error.message));
    } else {
      dispatch(setError("An error occurred while adding lead"));
    }
  }
};

export const updateLead = (id: string, lead: Lead) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log('Updating lead with ID:', id, 'Data:', lead);
    
    const response = await axios.put(`/api/routes/leads/${id}`, lead, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.data?.message || "Failed to update lead");
    }
    
    // Extract the actual lead data from the response
    const updatedLead = response.data;
    console.log('Update response:', updatedLead);
    
    if (!updatedLead || !updatedLead._id) {
      throw new Error('Invalid response: missing lead data or ID');
    }
    
    dispatch(updateLeadSuccess(updatedLead));
  } catch (error: unknown) {
    console.error('Error updating lead:', error);
    if (error instanceof Error) {
      dispatch(setError(error.message));
    } else {
      dispatch(setError("An error occurred while updating lead"));
    }
  }
};

export const deleteLead = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.delete(`/api/routes/leads/${id}`);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.data?.message || "Failed to delete lead");
    }
    dispatch(deleteLeadSuccess(id));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(setError(error.message));
    } else {
      dispatch(setError("An error occurred while deleting lead"));
    }
  }
};

export const selectLeads = (state: RootState) => state.leads.leads;
export const selectLoading = (state: RootState) => state.leads.loading;
export const selectError = (state: RootState) => state.leads.error;

export default leadSlice.reducer;
