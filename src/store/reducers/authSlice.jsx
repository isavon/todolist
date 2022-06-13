import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        isLoading: false,
        user: {},
        error: '',
    },
    reducers: {
        setIsAuth: (state, action) => {
            return {...state, isAuth: action.payload, isLoading: false, error: ''};
        },
        setIsLoaging: (state, action) => {
            state.isLoading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setError: (state, action) => {
            return {...state, error: action.payload, isLoading: false};
        },
        logout: (state) => {
            return {...state, isAuth: false, user: {}};
        },
    },
});

export const { setIsAuth, setIsLoaging, setUser, setError, logout } = authSlice.actions;

export default authSlice.reducer;