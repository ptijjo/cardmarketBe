import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/user/userSlice";
import categoryReducer from "./features/category/categorySlice";
const store = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            category: categoryReducer
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export default store;