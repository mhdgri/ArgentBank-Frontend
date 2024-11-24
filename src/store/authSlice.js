import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, getStorageItem, setStorageItem, clearAllStorage } from "../helper";

const storedToken = getStorageItem("token");

const initialState = {
    isAuthenticated: Boolean(storedToken),
    email: "",
    rememberMe: Boolean(storedToken),
    token: storedToken,
    user: null,
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
            return rejectWithValue(data.message || "Email ou mot de passe incorrect.");
        }

        const { token } = data.body || {};
        setStorageItem("token", token, rememberMe);

        return { token, email, rememberMe };
    } catch (error) {
        return rejectWithValue(error.message || "Une erreur s'est produite lors de la connexion.");
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
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.email = action.payload.email;
                state.rememberMe = action.payload.rememberMe;
            })
            .addCase(login.rejected, (state) => {
                state.isAuthenticated = false;
                state.token = null;
                state.email = "";
                state.rememberMe = false;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
