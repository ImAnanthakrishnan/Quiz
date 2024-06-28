import { combineReducers,configureStore } from "@reduxjs/toolkit";

import {persistReducer,persistStore} from 'redux-persist';
import userReducer from '../slice/userSlice';
import storage from "redux-persist/lib/storage";
import quizReducer from '../slice/quizSlice';
import leaderBoardReducer from '../slice/leaderboardSlice';
const userPersistConfig = {
    key:"user",
    version:1,
    storage,
    whitelist:['currentUser','token']
}

const persistedUserReducer = persistReducer(userPersistConfig,userReducer);

const rootReducer = combineReducers({
    user:persistedUserReducer,
    quiz:quizReducer,
    leaderboard:leaderBoardReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) => 
       getDefaultMiddleware({
        serializableCheck:false
       })
});


export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
