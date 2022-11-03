import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {appReducer} from './app-reducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>;

//это нужно чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
