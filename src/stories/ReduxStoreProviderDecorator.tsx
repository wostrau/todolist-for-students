import React from 'react'
import {Provider} from 'react-redux';
import {AppRootStateType, RootReducerType} from '../app/store';
import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {combineReducers} from 'redux';
import {v4 as uuid4} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';
import {appReducer} from '../app/app-reducer';
import thunkMiddleware from 'redux-thunk';
import {authReducer} from '../features/TodolistsList/Login/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';

const rootReducer: RootReducerType = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
});

const initialGlobalState: AppRootStateType = {
    todolists: [
        {
            id: 'todolistId1',
            title: 'What to learn',
            filter: 'All',
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        },
        {
            id: 'todolistId2',
            title: 'What to buy',
            filter: 'All',
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        }
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: uuid4(),
                todolistId: 'todolistId1',
                title: 'HTML&CSS',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: ''
            },
            {
                id: uuid4(),
                todolistId: 'todolistId1',
                title: 'JAVASCRIPT',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: ''
            },
        ],
        ['todolistId2']: [
            {
                id: uuid4(),
                todolistId: 'todolistId2',
                title: 'MONITOR',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: ''
            },
            {
                id: uuid4(),
                todolistId: 'todolistId2',
                title: 'COMPUTER',
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Later,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: ''
            },
        ]
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
};

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
};