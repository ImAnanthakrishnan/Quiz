import { PayloadAction,createSlice } from "@reduxjs/toolkit";

type User = {
    name:string;
    difficulty:string;
    score:number;
}

type InitialState = {
    users:User[]|null;
    loading:boolean;
    error:undefined|string
}

const initialState:InitialState = {
    users:null,
    loading:false,
    error:undefined
}

const leaderBoardSlice = createSlice({
    name:'leaderboard',
    initialState,
    reducers:{
        leaderStart:(state)=>{
            state.loading = true
        },
        leaderSuccess:(state,action:PayloadAction<User[]|null>) => {
            state.loading=false;
            state.users = action.payload
        },
        leaderFailed:(state,action:PayloadAction<string|undefined>) => {
            state.loading=false;
            state.error= action.payload
        }
    }
});

export const {leaderSuccess,leaderStart,leaderFailed} = leaderBoardSlice.actions;

export default leaderBoardSlice.reducer;