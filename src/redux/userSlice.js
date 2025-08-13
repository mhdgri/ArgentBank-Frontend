import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiService from '../services/api'

const initialState = {
    profile: null,
    isLoading: false,
    error: null,
}

    // Action async pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const data = await apiService.getUserProfile()
            return data.body
        } catch (error) {
            return rejectWithValue(error.message || 'Erreur lors de la récupération du profil')
        }
    }
)

// Action async pour mettre à jour le profil utilisateur
export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async (userData, { rejectWithValue }) => {
        try {
            const data = await apiService.updateUserProfile(userData)
            return data.body
        } catch (error) {
            return rejectWithValue(error.message || 'Erreur lors de la mise à jour du profil')
        }
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
        clearUserData: (state) => {
            state.profile = null
            state.error = null
            console.log('Données utilisateur supprimées')
        },

        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Récupération du profil utilisateur
            .addCase(fetchUserProfile.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.profile = action.payload
                state.error = null
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
            // Mise à jour du profil utilisateur
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.profile = action.payload
                state.error = null
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})


export const { clearUserData, clearError } = userSlice.actions


export default userSlice.reducer