import { PayloadAction,createSlice } from "@reduxjs/toolkit";

type Quiz = {
    _id:string;
    question:string;
    answers:{
        answerText:string;
        right:boolean;
    }[];
}

type InitialState = {
    quizes:Quiz[]|[];
    loading:boolean;
    error:undefined|string;
}

const initialState:InitialState = {
    quizes:[],
    loading:false,
    error:undefined
}

const QuizSlice = createSlice({
    name:'quiz',
    initialState,
    reducers:{
        start:(state)=>{
            state.loading = false;
        },
        success:(state,action:PayloadAction<Quiz[]|[]>) => {
            state.loading = false;
            state.quizes = action.payload;
        },
        failed:(state,action:PayloadAction<string|undefined>)=>{
            state.loading=false;
            state.error=action.payload
        }
    }
});

export const {start,success,failed} = QuizSlice.actions;

export default QuizSlice.reducer
