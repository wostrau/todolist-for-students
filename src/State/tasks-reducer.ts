import {TaskStateType} from '../App';
import {v4 as uuid4} from 'uuid';

type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}

type Action2Type = {
    type: '2',
    title: string
}

export type ActionsType = RemoveTaskActionType | Action2Type;

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId};
};

export const action2AC = (title: string): Action2Type => {
    return {type: '2', title: title};
};

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state};
        }
        case '2': {
            return {...state};
        }
        default:
            throw new Error('I do not understand this type of action')
    }
};