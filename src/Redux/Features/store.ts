import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/Redux/Features/auth/authSlice'
import { baseApi } from "../api/baseApi";
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

//make persistconfig  

//persist config redux ar local state a value gula ..store kore rakhe
const persistConfig = {
    key: 'auth',
    storage
}


//wich reducer are persisted ! Ans :  auth reducer  beacuse of auth info like token and info store korte
const persistedAuthReducer = persistReducer(persistConfig, authReducer)


export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore redux-persist actions
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/FLUSH',
                    'persist/REHYDRATE',
                    'persist/PAUSE',
                    'persist/PURGE',
                    'persist/REGISTER',
                ],
            },
        }).concat(baseApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)


