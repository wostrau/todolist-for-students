import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {TodolistActionsType, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {TaskActionsType, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {AppActionsType, appReducer, SetAppErrorActionType, SetAppStatusActionType} from './app-reducer';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {AuthActionsType, authReducer} from '../features/TodolistsList/Login/auth-reducer';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>;
type EntireAppActionsType =
    | TodolistActionsType
    | TaskActionsType
    | AuthActionsType
    | SetAppStatusActionType
    | SetAppErrorActionType
    | AppActionsType
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, EntireAppActionsType>

//это нужно чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
