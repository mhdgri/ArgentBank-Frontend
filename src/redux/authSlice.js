import { createSlice } from '@reduxjs/toolkit'

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
})

export const { clearError } = authSlice.actions
export default authSlice.reducer