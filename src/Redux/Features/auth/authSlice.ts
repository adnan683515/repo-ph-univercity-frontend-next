import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"


type TauthState = {
    user: null | object,
    token: null | string
}

const initialState: TauthState = {
    user: null,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        setUser: (state, action) => {
            const { user, token } = action?.payload
            console.log(action?.payload)
            state.user = user
            state.token = token
        },

        Logout: (state) => {
            state.user = null
            state.token = null
        }
    }
})

export const { setUser, Logout } = authSlice.actions

export default authSlice.reducer

export const useCurrentToken = (state: RootState) => state?.auth?.token
export const useCurrentUser = (state: RootState) => state?.auth?.user