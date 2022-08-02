import {TaskStateType} from '../App';
import {v4 as uuid4} from 'uuid';
import {AddTodolistActionType} from './todolists-reducer';

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
    isDone: boolean
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistId: string
    title: string
}

export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType;

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId};
};

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistId: todolistId, title: title};
};

export const changeTaskStatusAC = (taskId: string, todolistId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId: todolistId, taskId: taskId, isDone: isDone};
};

export const changeTaskTitleAC = (taskId: string, todolistId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId: todolistId, taskId: taskId, title: title};
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title};
};

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: uuid4(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy;
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy;
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[uuid4()] = [];
            return stateCopy;
        }
        default:
            throw new Error('I do not understand this type of action')
    }
};