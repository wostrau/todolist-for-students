import {combineReducers} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import {configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({reducer: rootReducer});

// @ts-ignore
window.store = store;
