import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStore: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logoutStore: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export const { loginStore, logoutStore } = authSlice.actions;


export default authSlice.reducer;