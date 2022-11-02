import {v4 as uuid4} from 'uuid';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType,
    todolistId1,
    todolistId2
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../app/store';

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
};

//reducer
export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        case 'ADD-TASK':
            return {...state, [action.task.todolistId]: [action.task, ...state[action.task.todolistId]]};
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            };
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []};
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        case 'SET-TODOLISTS': {
            const stateCopy = {...state};
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            });
            return stateCopy;
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks};
        default:
            return state;
    }
};

//actions
export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    taskId: taskId,
    todolistId: todolistId
} as const);
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const);
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
    type: 'UPDATE-TASK',
    todolistId: todolistId,
    taskId: taskId,
    model
} as const);
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'SET-TASKS',
    tasks: tasks,
    todolistId: todolistId
} as const);

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.getTask(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
};
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            const action = removeTaskAC(taskId, todolistId);
            dispatch(action);
        })
};
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId);
        if (!task) {
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
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTask(todolistId, title)
        .then((res) => {
            const task = res.data.data.item;
            const action = addTaskAC(task);
            dispatch(action);
        })
};

//types
export type TaskStateType = {
  [key: string]: Array<TaskType>
};
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
};
export type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>