import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {todolistsAPI} from '../api/todolists-api';

export default {
    title: 'API'
};

export const GetTodolist = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        todolistsAPI.createTodolist('Alex todolist')
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '96e14868-2995-4951-a0b1-5ff5cded4fa9'

    useEffect(() => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>
};

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '96e14868-2995-4951-a0b1-5ff5cded4fa9';

    useEffect(() => {
        todolistsAPI.updateTodolist(todolistId, 'Yo-yo todolist')
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>
};