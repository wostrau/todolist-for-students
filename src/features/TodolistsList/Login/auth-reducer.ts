import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../../app/app-reducer';
import {authAPI, AuthParamTypes} from '../../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../../utilities/error-utilities';
import {ThunkDispatch} from 'redux-thunk';
import {AppDispatch} from '../../../app/store';

const initialSate: AuthInitialStateType = {
    isLoggedIn: false
};

//reducer
export const authReducer = (state: AuthInitialStateType = initialSate, action: AuthActionsType): AuthInitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value};
        default:
            return state;
    }
};

//actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const);

//thunks
export const loginTC = (data: AuthParamTypes) => (dispatch: AuthThunkDispatch) => {
    dispatch(setAppStatusAC('loading'));
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        });
};
export const logoutTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'));
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        });
};

//types

export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>;
export type AuthInitialStateType = {
    isLoggedIn: boolean
};
export type AuthThunkDispatch = ThunkDispatch<AuthInitialStateType, unknown, AuthActionsType | SetAppStatusActionType | SetAppErrorActionType>;