import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../../app/app-reducer';
import {authAPI, AuthParamTypes} from '../../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../../utilities/error-utilities';
import {ThunkDispatch} from 'redux-thunk';
import {AppDispatch} from '../../../app/store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false
};

//slice:
const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    }
});

//reducer
export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions;

//thunks
export const loginTC = (data: AuthParamTypes) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: true}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        });
};
export const logoutTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: false}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        });
};

//types
export type AuthThunkDispatch = ThunkDispatch<unknown, unknown, SetAppStatusActionType | SetAppErrorActionType>;