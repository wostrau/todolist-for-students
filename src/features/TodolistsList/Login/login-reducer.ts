import {SetAppErrorActionType, SetAppStatusActionType} from '../../../app/app-reducer';
import {Dispatch} from 'redux';

const initialState: TaskStateType = {};

//reducer
export const loginReducer = (state: TaskStateType = initialState, action: LoginActionsType): TaskStateType => {
    switch (action.type) {


        default:
            return state;
    }
};

//actions
/*
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'SET-TASKS',
    tasks: tasks,
    todolistId: todolistId
} as const);
*/

//thunks
export const fetchTasksTC = (email: string, password: string, rememberMe: boolean) => (dispatch: LoginThunkDispatch) => {
    alert('digital outcast')
};

//types

export type LoginActionsType = any;

type LoginThunkDispatch = Dispatch<LoginActionsType | SetAppStatusActionType | SetAppErrorActionType>;

