import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
    token: null,
    user: null

}

export const loginSlice = createSlice({
    name: 'loggedIn',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { tokeni, useri } = action.payload
            state.token = tokeni
            state.isLogin = true
            state.user = useri
        },
        logOut: (state) => {
            state.token = null
            state.user = null
            state.isLogin = false

        }


    }
})
export const { setCredentials, logOut } = loginSlice.actions
export default loginSlice.reducer