import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default {
    title: 'API'
};

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '96e14868-2995-4951-a0b1-5ff5cded4fa9'
    }
};

export const GetTodolist = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'Alex todolist'}, settings)
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>
};

export const DeleteTodolist = () => {

};

export const UpdateTodolistTitle = () => {

};