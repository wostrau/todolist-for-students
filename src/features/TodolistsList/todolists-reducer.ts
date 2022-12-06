import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer';
import {Dispatch} from 'redux';
import {handleServerNetworkError} from '../../utilities/error-utilities';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

//initial state
const initialState: Array<TodolistDomainType> = [];

//slice
const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'All', entityStatus: 'idle'}));
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'All', entityStatus: 'idle'});
        },
        changeTitleTodolistAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].title = action.payload.title;
        },
        changeFilterTodolistAC(state, action: PayloadAction<{ id: string, filter: changeFilterPropsType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].filter = action.payload.filter;
        },
        changeEntityStatusTodolistAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].entityStatus = action.payload.status;
        },
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) state.splice(index, 1);
        }
    }
});

//reducer
export const todolistsReducer = slice.reducer;
export const {
    setTodolistsAC,
    addTodolistAC,
    changeTitleTodolistAC,
    changeFilterTodolistAC,
    changeEntityStatusTodolistAC,
    removeTodolistAC
} = slice.actions;
/*(state: Array<TodolistDomainType> = initialState, action: TodolistActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id);
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'All', entityStatus: 'idle'}, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl);
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'All', entityStatus: 'idle'}))
        default:
            return state;
    }
};*/

//actions
/*
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({
    type: 'SET-TODOLISTS',
    todolists
} as const);
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
export const changeEntityStatusTodolistAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    status
} as const);
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const);
*/

//thunks
export const fetchTodolistsTC = () => (dispatch: TodolistThunkDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC({todolists: res.data}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })
};
export const addTodolistTC = (title: string) => (dispatch: TodolistThunkDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistsAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC({todolist: res.data.data.item}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        });
};
export const changeTitleTodolistTC = (id: string, title: string) => (dispatch: Dispatch<TodolistActionsType>) => {
    todolistsAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTitleTodolistAC({id: id, title: title}));
        });
};
export const removeTodolistTC = (todolistId: string) => (dispatch: TodolistThunkDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    dispatch(changeEntityStatusTodolistAC({id: todolistId, status: 'loading'}));
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC({id: todolistId}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        });
};

//types
export type changeFilterPropsType = 'All' | 'Active' | 'Completed';
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type TodolistDomainType = TodolistType & {
    filter: changeFilterPropsType
    entityStatus: RequestStatusType
};
export type TodolistActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof changeTitleTodolistAC>
    | ReturnType<typeof changeFilterTodolistAC>
    | ReturnType<typeof changeEntityStatusTodolistAC>
    | SetAppStatusActionType;
export type TodolistThunkDispatch = Dispatch<TodolistActionsType | SetAppStatusActionType | SetAppErrorActionType>;

