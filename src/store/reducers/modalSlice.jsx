import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        visible: false,
        confirmLoading: false,
    },
    reducers: {
        setVisible: (state, action) => {
            state.visible = action.payload;
        },
        setConfirmLoading: (state, action) => {
            state.confirmLoading = action.payload;
        },
    },
});

export const { setVisible, setConfirmLoading } = modalSlice.actions;

export default modalSlice.reducer;