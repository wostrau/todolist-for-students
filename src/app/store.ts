import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {TodolistActionsType, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {TaskActionsType, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {appReducer, SetAppErrorActionType, SetAppStatusActionType} from './app-reducer';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>;
type AppActionsType =
    | TodolistActionsType
    | TaskActionsType
    | SetAppStatusActionType
    | SetAppErrorActionType
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

//это нужно чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
