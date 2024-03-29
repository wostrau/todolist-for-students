import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '96e14868-2995-4951-a0b1-5ff5cded4fa9'
    }
};
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
});

//api-todolist
export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title});
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title});
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
    getTask(id: string) {
        return instance.get<TaskResponseType>(`todo-lists/${id}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: title});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, {
            title: model.title,
            description: model.description,
            status: model.status,
            priority: model.priority,
            startDate: model.startDate,
            deadline: model.deadline
        });
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
};

//api-auth
export const authAPI = {
    login(data: AuthParamTypes) {
        const promise = instance.post<ResponseType<{userId?: number}>>('auth/login', data);
        return promise;
    },
    logout() {
        const promise = instance.delete<ResponseType<{userId?: number}>>('auth/login');
        return promise;
    },
    me() {
        const promise = instance.get<ResponseType<{id: number, email: string, login: string}>>('auth/me');
        return promise;
    }
};

//types
export type AuthParamTypes = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
};
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
};
type TaskResponseType = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
};
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
};
export type TaskType = {
    id: string
    todolistId: string
    title: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    addedDate: string
    startDate: string
    deadline: string
    description: string
};
export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
};

//types-enums
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later,
}