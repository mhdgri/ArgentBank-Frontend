import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiService from '../services/api'

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await apiService.login(credentials)
            return data.body.token
        } catch (error) {
            return rejectWithValue(error.message || 'Erreur de connexion')
        }
    }
)

const initialState = {
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.token = action.payload
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.token = null
                state.isAuthenticated = false
                state.error = action.payload
            })
    }
})

export const { clearError } = authSlice.actions
export default authSlice.reducer