import {TaskStateType} from '../App';
import {v4 as uuid4} from 'uuid';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType,
    todolistId1,
    todolistId2
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todolistId: string
    status: TaskStatuses
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistId: string
    title: string
}

export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType;

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId};
};

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistId: todolistId, title: title};
};

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId: todolistId, taskId: taskId, status: status};
};

export const changeTaskTitleAC = (taskId: string, todolistId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId: todolistId, taskId: taskId, title: title};
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: uuid4()};
};

const initialState: TaskStateType = {
    [todolistId1]: [
        {
            id: uuid4(),
            todolistId: todolistId1,
            title: 'REACT',
            order: 0,
            status: TaskStatuses.New,
            priority: TaskPriorities.Hi,
            addedDate: '',
            startDate: '',
            deadline: '',
            description: ''
        },
        {
            id: uuid4(),
            todolistId: todolistId1,
            title: 'TYPESCRIPT',
            order: 0,
            status: TaskStatuses.New,
            priority: TaskPriorities.Hi,
            addedDate: '',
            startDate: '',
            deadline: '',
            description: ''
        },
    ],
    [todolistId2]: [
        {
            id: uuid4(),
            todolistId: todolistId2,
            title: 'MONITOR',
            order: 0,
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            addedDate: '',
            startDate: '',
            deadline: '',
            description: ''
        },
        {
            id: uuid4(),
            todolistId: todolistId2,
            title: 'COMPUTER',
            order: 0,
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Later,
            addedDate: '',
            startDate: '',
            deadline: '',
            description: ''
        },
    ],
}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId);
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {
                id: uuid4(),
                todolistId: action.todolistId,
                title: action.title,
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: ''
            }
            stateCopy[action.todolistId] = [newTask, ...tasks];
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let tasks = state[action.todolistId];
            // @ts-ignore
            state[action.todolistId] = tasks.map(t => t.id === action.taskId
                ? {...t, status: action.status}
                : t
            );
            return {...state};
        }
        case 'CHANGE-TASK-TITLE': {
            let tasks = state[action.todolistId];
            // @ts-ignore
            state[action.todolistId] = tasks.map(t => t.id === action.taskId
                ? {...t, title: action.title}
                : t
            );
            return {...state};
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state};

            action.todolists.forEach(tl => {
               stateCopy[tl.id] = [];
            });

            return stateCopy;
        }
        default:
            return state;
    }
};