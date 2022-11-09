import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../../app/app-reducer';
import {Dispatch} from 'redux';
import {authAPI, LoginParamTypes} from '../../../api/todolists-api';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;
import {handleServerAppError, handleServerNetworkError} from '../../../utilities/error-utilities';
import {ThunkDispatch} from 'redux-thunk';

const initialSate: LoginInitialStateType = {};

//reducer
export const loginReducer = (state: LoginInitialStateType = initialSate, action: LoginActionsType): LoginInitialStateType => {
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
export const loginTC = (data: LoginParamTypes) => (dispatch: LoginThunkDispatch) => {
    dispatch(setAppStatusAC('loading'));
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                alert('YO!')
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        });
};

//types

export type LoginActionsType = any;
export type LoginInitialStateType = {};
export type LoginThunkDispatch = ThunkDispatch<LoginInitialStateType, unknown, LoginActionsType | SetAppStatusActionType | SetAppErrorActionType>;