import {changeFilterPropsType, todolistPropsType} from '../App';
import {v4 as uuid4} from 'uuid';

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}

type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

type ChangeFilterTodolistActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: changeFilterPropsType
}

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistActionType | ChangeFilterTodolistActionType

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId};
};

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title};
};

export const ChangeTitleTodolistAC = (id: string, title: string): ChangeTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title};
};

export const ChangeFilterTodolistAC = (id: string, filter: changeFilterPropsType): ChangeFilterTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter};
};

export const todolistsReducer = (state: Array<todolistPropsType>, action: ActionsType): Array<todolistPropsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: uuid4(),
                title: action.title,
                filter: 'All'
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
            throw new Error('I do not understand this type of action')
    }
};