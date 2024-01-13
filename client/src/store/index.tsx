// redux saga or redux thunk
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './reducers/userReducer';
import { imageReducer } from './reducers/imageReducer';
import { cardReducer } from './reducers/cardReducer';
import { transactionReducer } from './reducers/transactionReducer';
import { backgroundReducer } from './reducers/backgroundReducer'

const store = configureStore({
    reducer: combineReducers({
        userReducer,
        imageReducer,
        cardReducer,
        transactionReducer,
        backgroundReducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, thunk),
    devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;