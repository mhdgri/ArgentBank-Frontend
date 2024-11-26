import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, getStorageItem, setStorageItem, clearAllStorage } from "../helper";

const initialState = {
    isAuthenticated: !!getStorageItem("token"),
    email: "",
    rememberMe: !!getStorageItem("token"),
    token: getStorageItem("token"),
    user: null,
    isProfileEditVisible: false,
};

export const login = createAsyncThunk("auth/login", async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
        const response = await fetch(`${API_URL}/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            return rejectWithValue(data.message || "Incorrect email or password.");
        }

        const { token } = data.body || {};
        setStorageItem("token", token, rememberMe);

        return { token, email, rememberMe };
    } catch (error) {
        return rejectWithValue("An error occurred during login.");
    }
});

export const fetchProfile = createAsyncThunk("auth/fetchProfile", async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
        const response = await fetch(`${API_URL}/user/profile`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (!response.ok) {
            return rejectWithValue(data.message || "Unable to retrieve user profile");
        }

        return data.body;
    } catch (error) {
        return rejectWithValue(error.message || "An error occurred while fetching the user profile");
    }
});

export const updateProfile = createAsyncThunk("auth/updateProfile", async (userName, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
        const response = await fetch(`${API_URL}/user/profile`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ userName }),
        });

        const data = await response.json();

        if (!response.ok) {
            return rejectWithValue(data.message || "Unable to update user profile");
        }

        return data.body;
    } catch (error) {
        return rejectWithValue(error.message || "An error occurred while updating the user profile");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            clearAllStorage();
        },
        showProfileEdit(state) {
            state.isProfileEditVisible = true;
        },
        hideProfileEdit(state) {
            state.isProfileEditVisible = false;
        },
    },
    extraReducers: builder => {
        builder
            // LOGIN REDUCERS
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.email = action.payload.email;
                state.rememberMe = action.payload.rememberMe;
            })
            .addCase(login.rejected, state => {
                state.isAuthenticated = false;
                state.token = null;
                state.email = "";
                state.rememberMe = false;
            })

            // FETCH PROFILE REDUCERS
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(fetchProfile.rejected, state => {
                state.user = null;
            })

            // UPDATE PROFILE REDUCERS
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const { logout, showProfileEdit, hideProfileEdit } = authSlice.actions;

export default authSlice.reducer;
