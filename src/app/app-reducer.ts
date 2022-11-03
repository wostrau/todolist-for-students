const initialState: InitialStateType = {
    status: 'idle',
    error: null
};

//reducer
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
};

//action creators
export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
};
export type SetErrorActionType = ReturnType<typeof setErrorAC>;
export type SetStatusActionType = ReturnType<typeof setStatusAC>;
type ActionsType =
    | SetErrorActionType
    | SetStatusActionType
