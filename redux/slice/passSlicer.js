import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null

}

export const passSlice = createSlice({
    name: 'passtoken',
    initialState,
    reducers: {
        setTokens: (state, action) => {
            const { token } = action.payload
            state.token = token

        },


    }
})
export const { setTokens } = passSlice.actions
export default passSlice.reducer