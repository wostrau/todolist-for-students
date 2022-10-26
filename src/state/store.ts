import {applyMiddleware, combineReducers} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import {configureStore} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({reducer: rootReducer, middleware: [applyMiddleware(thunkMiddleware)]});

// @ts-ignore
window.store = store;
