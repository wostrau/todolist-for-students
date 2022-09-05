import React from 'react'
import {Provider} from 'react-redux';
import {AppRootStateType, store} from '../State/store';
import {tasksReducer} from '../State/tasks-reducer';
import {todolistsReducer} from '../State/todolists-reducer';
import {combineReducers} from 'redux';
import {v4 as uuid4} from 'uuid';
import {configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'ALL'},
        {id: 'todolistId2', title: 'What to buy', filter: 'ALL'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: uuid4(), title: 'HTML&CSS', isDone: true},
            {id: uuid4(), title: 'JAVASCRIPT', isDone: true},
        ],
        ['todolistId2']: [
            {id: uuid4(), title: 'MONITOR', isDone: true},
            {id: uuid4(), title: 'COMPUTER', isDone: true},
        ]
    }
};

// @ts-ignore
export const storyBookStore = configureStore({reducer: rootReducer, initialGlobalState: AppRootStateType});

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={store}>{storyFn()}</Provider>
};