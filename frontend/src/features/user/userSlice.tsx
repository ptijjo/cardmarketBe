/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../../../backend/src/models/client/user.model';


interface User {
    userId: string,
    userEmail: string,
    userRole: string,
    userFirstName: string,
    userLastName: string
}

interface userState {
    user: User | null
    status: "idle" | "loading" | "success" | "failed";
    error: string | null
}


export const login = createAsyncThunk("users/logging", async (data:string) => {
           
    const response = await axios.post("http://localhost:8080/users/decodage", {
        token: data
    });
    return response.data
})


const initialState: userState = {
    user: null,
    status: "idle",
    error: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: state => {
            localStorage.removeItem("token")
            state.user = null,
            state.status="idle"
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
            })

            .addCase(login.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload;
            })

            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message as string;
            });
    },


});



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectUser = (state: any) => state.user.user;
export const selectUserStatus = (state: any) => state.user.status;
export const { logout } = userSlice.actions;


export default userSlice.reducer;