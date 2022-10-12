import {v4 as uuid4} from 'uuid';
import {TodolistType} from '../api/todolists-api';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
};

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
};

type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string,
    title: string
};

type ChangeFilterTodolistActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: changeFilterPropsType
};

export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistActionType
    | ChangeFilterTodolistActionType;

export type changeFilterPropsType = 'All' | 'Active' | 'Completed';

export type TodolistDomainType = TodolistType & {
    filter: changeFilterPropsType
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId};
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: uuid4()};
};

export const changeTitleTodolistAC = (id: string, title: string): ChangeTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title};
};

export const changeFilterTodolistAC = (id: string, filter: changeFilterPropsType): ChangeFilterTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter};
};

export const todolistId1 = uuid4();
export const todolistId2 = uuid4();

const initialState: Array<TodolistDomainType> = [
    {
        id: todolistId1,
        title: 'What to learn',
        filter: 'All',
        addedDate: '',
        order: 0
    },
    {
        id: todolistId2,
        title: 'What to buy',
        filter: 'All',
        addedDate: '',
        order: 0
    },
];

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: 'All',
                addedDate: '',
                order: 0
            }];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(el => el.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(el => el.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
};