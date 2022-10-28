import {TaskStateType} from '../App';
import {v4 as uuid4} from 'uuid';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType,
    todolistId1,
    todolistId2
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, TodolistType, UpdateTaskType} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}

type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    taskId: string
    todolistId: string
    model: UpdateDomainTaskModelType
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistId: string
    title: string
}

type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType;

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId};
};

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task};
};

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', todolistId: todolistId, taskId: taskId, model};
};

export const changeTaskTitleAC = (taskId: string, todolistId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId: todolistId, taskId: taskId, title: title};
};

export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist: todolist};
};

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks: tasks, todolistId: todolistId};
};

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTask(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    };
};

export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                const action = removeTaskAC(taskId, todolistId);
                dispatch(action);
            })
    };
};

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId);
        if (!task) {
            //throw new Error('TASK IS NOT DEFINED IN THE STATE');
            console.warn('TASK IS NOT DEFINED IN THE STATE');
            return;
        }

        const apiModel: UpdateTaskType = {
            title: task.title,
            status: task.status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            ...domainModel
        };

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                const action = updateTaskAC(taskId, domainModel, todolistId);
                dispatch(action);
            })
    };
};

export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                const task = res.data.data.item;
                const action = addTaskAC(task);
                dispatch(action);
            })
    };
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
            const newTask = action.task;
            const tasks = stateCopy[newTask.todolistId];
            const newTasks = [newTask, ...tasks];
            stateCopy[newTask.todolistId] = newTasks;
            return stateCopy;
        }
        case 'UPDATE-TASK': {
            let tasks = state[action.todolistId];
            // @ts-ignore
            state[action.todolistId] = tasks.map(t => t.id === action.taskId
                ? {...t, ...action.model}
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
            stateCopy[action.todolist.id] = [];
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
        case 'SET-TASKS': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = action.tasks;
            return stateCopy;
        }
        default:
            return state;
    }
};