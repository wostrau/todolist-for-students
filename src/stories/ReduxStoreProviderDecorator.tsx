import React from 'react'
import {Provider} from 'react-redux';
import {AppRootStateType, store} from '../state/store';
import {tasksReducer} from '../state/tasks-reducer';
import {todolistsReducer} from '../state/todolists-reducer';
import {combineReducers} from 'redux';
import {v4 as uuid4} from 'uuid';
import {configureStore} from '@reduxjs/toolkit';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});

const initialGlobalState: AppRootStateType = {
    todolists: [
        {
            id: 'todolistId1',
            title: 'What to learn',
            filter: 'All',
            addedDate: '',
            order: 0
        },
        {
            id: 'todolistId2',
            title: 'What to buy',
            filter: 'All',
            addedDate: '',
            order: 0
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
    }
};

// @ts-ignore
export const storyBookStore = configureStore({reducer: rootReducer, initialGlobalState: AppRootStateType});

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={store}>{storyFn()}</Provider>
};