import React, {useEffect, useState} from 'react';
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

export const GetTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');

    const GetTasks = () => {
        todolistsAPI.getTask(todolistId)
            .then((res) => {
                setState(res.data);
            });
    };

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(event) => {
                    setTodolistId(event.currentTarget.value)
                }}
            />
            <button onClick={GetTasks}>get tasks</button>
        </div>
    </div>
};

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            });
    };

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(event) => {
                    setTodolistId(event.currentTarget.value)
                }}
            />
            <input
                placeholder={'taskId'}
                value={taskId}
                onChange={(event) => {
                    setTaskId(event.currentTarget.value)
                }}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
};

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [todolistId, setTodolistId] = useState<string>('');

    const CreateTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data);
            });
    };

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
            />
            <input
                placeholder={'task TITLE'}
                value={taskTitle}
                onChange={(e) => {
                    setTaskTitle(e.currentTarget.value)
                }}
            />
            <button onClick={CreateTask}>create task</button>
        </div>
    </div>
};

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<string>('title');
    const [description, setDescription] = useState<string>('description');
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [deadline, setDeadline] = useState<string>('');
    const [todolistId, setTodolistId] = useState('');
    const [taskId, setTaskId] = useState('');

    const updateTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: '',
            deadline: ''
        })
            .then((res) => {
                setState(res.data);
            });
    };

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'task id'}
                value={taskId}
                onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}
            />
            <input
                placeholder={'todolist id'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
            />
            <input
                placeholder={'task title'}
                value={title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}
            />
            <input
                placeholder={'description'}
                value={description}
                onChange={(e) => {
                    setDescription(e.currentTarget.value)
                }}
            />
            <input
                placeholder={'status'}
                value={status}
                onChange={(e) => {
                    setStatus(+e.currentTarget.value)
                }}
            />
            <input
                placeholder={'priority'}
                value={priority}
                onChange={(e) => {
                    setPriority(+e.currentTarget.value)
                }}
            />
            <button onClick={updateTask}>update task</button>
        </div>
    </div>
};