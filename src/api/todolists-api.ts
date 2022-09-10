import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '96e14868-2995-4951-a0b1-5ff5cded4fa9'
    }
};

type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
};

type ResponseType<D> = {
  resultCode: number
  messages: Array<string>
  data: D
};

export const todolistsAPI = {
    getTodolists() {
        const promise = axios.get<TodolistType[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings);
        return promise;
    },
    createTodolist(title: string) {
        const promise = axios.post<ResponseType<TodolistType>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings);
        return promise;
    },
    deleteTodolist(id: string) {
        const promise = axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings);
        return promise;
    },
    updateTodolist(id: string, title: string) {
        const promise = axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title: title}, settings);
        return promise;
    }
};