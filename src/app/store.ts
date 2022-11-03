import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {appReducer} from './app-reducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

const middlewareEnhancer = applyMiddleware(thunkMiddleware);
const composedEnhancers = compose(middlewareEnhancer);

export const store = createStore(rootReducer, undefined, composedEnhancers);


//export const store = configureStore({reducer: rootReducer, middleware: [applyMiddleware(thunkMiddleware)]});

// @ts-ignore
window.store = store;
