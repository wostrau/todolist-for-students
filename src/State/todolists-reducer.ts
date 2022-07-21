import {todolistPropsType} from '../App';
import {v4 as uuid4} from 'uuid';

export type ActionType = {
    id: string
    type: string
    title: string
    [key: string]: any
}

export const todolistsReducer = (state: Array<todolistPropsType>, action: ActionType): Array<todolistPropsType> => {
    let newState = {...state};
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
        default:
            throw new Error('I do not understand this type of action')
    }
};