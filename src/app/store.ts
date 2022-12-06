import {combineReducers} from 'redux';
import {TodolistActionsType, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {TaskActionsType, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {AppActionsType, appReducer, SetAppErrorActionType, SetAppStatusActionType} from './app-reducer';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {authReducer} from '../features/TodolistsList/Login/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
});

// Deprecated method of creating a Redux store (switched to configureStore method):
//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
type EntireAppActionsType =
    | TodolistActionsType
    | TaskActionsType
    | SetAppStatusActionType
    | SetAppErrorActionType
    | AppActionsType
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, EntireAppActionsType>

//это нужно чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
