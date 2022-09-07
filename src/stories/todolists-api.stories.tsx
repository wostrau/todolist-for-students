import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default {
    title: 'API'
};

const settings = {
    withCredentials: true
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

};

export const DeleteTodolist = () => {

};

export const UpdateTodolistTitle = () => {

};