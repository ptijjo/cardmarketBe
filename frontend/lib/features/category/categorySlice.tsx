import urlDb from "@/lib/urlDb";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Category {
    id?:number,
    titre: string,
    photoCategory: string,
}

interface categoryState {
    category: Category | null
    status: "idle" | "loading" | "success" | "failed";
    error: string | null
}

const initialState: categoryState = {
    category: null,
    status: "idle",
    error: null,
};


export const getCategory = createAsyncThunk("getCategory", async () => {
    const response = await axios.get(urlDb.getCategory);

    return response.data
})


export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder
            .addCase(getCategory.pending, (state) => {
                state.status = "loading";
            })
        
            .addCase(getCategory.fulfilled, (state, action) => {
                state.status = "success";
                state.category = action.payload;
            })
        
            .addCase(getCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message as string
            })
    } 
});

export const selectCategory = (state: any) => state.category.category;
export const selectCategoryStatus = (state: any) => state.category.status;
export const {  } = categorySlice.actions;


export default categorySlice.reducer;