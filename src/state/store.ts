import {applyMiddleware, combineReducers} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({reducer: rootReducer, middleware: [applyMiddleware(thunk)]});

// @ts-ignore
window.store = store;
