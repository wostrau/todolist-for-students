import {v4 as uuid4} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api';
import {Dispatch} from 'redux';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
};

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
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

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
};

export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistActionType
    | ChangeFilterTodolistActionType
    | SetTodolistsActionType;

export type changeFilterPropsType = 'All' | 'Active' | 'Completed';

export type TodolistDomainType = TodolistType & {
    filter: changeFilterPropsType
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
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'All'};
            return [newTodolist, ...state];
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
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: 'All'
                }
            })
        }
        default:
            return state;
    }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId};
};

export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist};
};

export const changeTitleTodolistAC = (id: string, title: string): ChangeTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title};
};

export const changeFilterTodolistAC = (id: string, filter: changeFilterPropsType): ChangeFilterTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter};
};

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists: todolists};
};

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    };
};

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
            })
    };
};

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    };
};

export const changeTitleTodolistTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTitleTodolistAC(id, title))
            })
    };
};