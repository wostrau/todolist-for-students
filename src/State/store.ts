import {combineReducers, createStore} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import {todolistPropsType} from '../AppWithRedux';
import {TaskStateType} from '../AppWithRedux';

type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});

export const store = createStore();

// @ts-ignore
window.store = store;
