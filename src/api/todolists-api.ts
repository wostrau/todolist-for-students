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
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
};

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
};

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
};

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later,
}

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
}

type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type TaskResponseType = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title});
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title});
    },
    getTask(id: string) {
        return instance.get<TaskResponseType>(`todo-lists/${id}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: title});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<UpdateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, {
            title: model.title,
            description: model.description,
            status: model.status,
            priority: model.priority,
            startDate: model.startDate,
            deadline: model.deadline
        });
    },
};