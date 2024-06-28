import { PayloadAction,createSlice } from "@reduxjs/toolkit";

type User = {
    _id:string;
    email:string;
    name:string;
}

type InitialState = {
    currentUser:User|null;
    loading:boolean;
    error:undefined|string;
    token:string|null
}

const initialState:InitialState = {
    currentUser:null,
    loading:false,
    error:undefined,
    token:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state) => {
            state.loading = true
        },
        signInSuccess:(state,action:PayloadAction<{data:User,token:string}>) => {
            state.currentUser = action.payload.data;
            state.error=undefined;
            state.loading=false;
            state.token=action.payload.token
        },
        signInFailure:(state,action:PayloadAction<string|undefined>)=> {
            state.loading=false;
            state.error= action.payload
        },
        logout:(state) => {
            state.currentUser = null;
            state.token = null;
        }
    }
});

export const {signInStart,signInSuccess,signInFailure,logout} = userSlice.actions;

export default userSlice.reducer;