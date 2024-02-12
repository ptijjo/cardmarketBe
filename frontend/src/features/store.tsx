import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

const store = configureStore({
    reducer: {
        user: userReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const Dispatch = () => useDispatch<AppDispatch>();
export const Selector: TypedUseSelectorHook<RootState> = useSelector;


// eslint-disable-next-line react-refresh/only-export-components
export default store;