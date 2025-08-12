import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiService from '../services/api'

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await apiService.login(credentials)
            localStorage.setItem('token', data.body.token)
            return data.body.token
        } catch (error) {
            return rejectWithValue(error.message || 'Erreur de connexion')
        }
    }
)

const initialState = {
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
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
        logout: (state) => {
            state.token = null
            state.isAuthenticated = false
            state.error = null
            console.log('Utilisateur déconnecté !')
            try {
                localStorage.removeItem('userName');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                console.log('localStorage nettoyé');
            } catch (error) {
                console.warn('Erreur lors du nettoyage du localStorage:', error);
            }
            
            console.log('Utilisateur déconnecté !');
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

export const { clearError, logout } = authSlice.actions
export default authSlice.reducer