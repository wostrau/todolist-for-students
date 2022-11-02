import {v4 as uuid4} from 'uuid';
import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {ThunkDispatch} from 'redux-thunk';

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

//reducer
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id);
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'All'}, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'All'}))
        default:
            return state;
    }
};

//actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const);
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const);
export const changeTitleTodolistAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const);
export const changeFilterTodolistAC = (id: string, filter: changeFilterPropsType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const);
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({
    type: 'SET-TODOLISTS',
    todolists
} as const);

//thunks
export const fetchTodolistsTC = () => (dispatch: any) => {
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
};
export const removeTodolistTC = (todolistId: string) => (dispatch: any) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
};
export const addTodolistTC = (title: string) => (dispatch: any) => {
    todolistsAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
};
export const changeTitleTodolistTC = (id: string, title: string) => (dispatch: any) => {
    todolistsAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTitleTodolistAC(id, title))
        })
};

//types
export type changeFilterPropsType = 'All' | 'Active' | 'Completed';
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type TodolistDomainType = TodolistType & {
    filter: changeFilterPropsType
};
export type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof changeTitleTodolistAC>
    | ReturnType<typeof changeFilterTodolistAC>
