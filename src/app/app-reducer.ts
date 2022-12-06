import {authAPI} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/TodolistsList/Login/auth-reducer';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType} from './store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
};

//slice
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{error: null | string}>) {
            state.error = action.payload.error;
        },
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status;
        },
        setAppInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized;
        }
    }
});

//reducer
export const appReducer = slice.reducer;
/*(state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
};
*/

//actions
export const {setAppErrorAC, setAppStatusAC, setAppInitializedAC} = slice.actions;
//(error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
//(status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
//(isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const);

//thunks
export const initializeAppTC = () => (dispatch: AppThunkDispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({isLoggedIn: true}))
        } else {

        }
        dispatch(setAppInitializedAC({isInitialized: true}))
    })
};

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдет - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: boolean
};
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof setAppInitializedAC>
    | ReturnType<typeof setIsLoggedInAC>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
