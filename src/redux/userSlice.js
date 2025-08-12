import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    profile: null,
    isLoading: false,
    error: null,
}


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
})


export const { clearUserData, clearError } = userSlice.actions


export default userSlice.reducer