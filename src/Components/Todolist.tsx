import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import '../App.css';
import {changeFilterPropsType} from '../App';
import {AddItemForm} from './AddItemForm';
import EditableSpan from './EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, Checkbox, Icon, IconButton} from '@mui/material';

export type taskPropsType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    id: string
    title: string
    taskList: Array<taskPropsType>
    addTask: (title: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: changeFilterPropsType, id: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: changeFilterPropsType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: TodolistPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<null | string>(null);

    /*const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    };
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            props.addTask(newTaskTitle, props.id)
            setNewTaskTitle('')
        }
    };
    const addTasks = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(), props.id)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    };*/

    const onAllClickHandler = () => props.changeFilter('All', props.id);

    const onActiveClickHandler = () => props.changeFilter('Active', props.id);

    const onCompletedClickHandler = () => props.changeFilter('Completed', props.id);

    const onClickRemoveTodolistHandler = () => {
        props.removeTodolist(props.id)
    };

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, []);

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    };

    return (
        <div>
            <h3>
                <EditableSpan
                    title={props.title}
                    onChange={changeTodolistTitle}
                />
                <IconButton
                    aria-label="delete"
                    onClick={onClickRemoveTodolistHandler}
                >
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {props.taskList.map((el => {
                    const onClickRemoveHandler = () => {
                        props.removeTask(el.id, props.id)
                    };
                    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, event.currentTarget.checked, props.id)
                    };
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(el.id, newValue, props.id)
                    };
                    return (
                        <div
                            key={el.id}
                            className={el.isDone ? 'is-done' : ''}
                        >
                            <Checkbox
                                onChange={onChangeStatusHandler}
                                checked={el.isDone}
                            />
                            <EditableSpan
                                title={el.title}
                                onChange={onChangeTitleHandler}
                            />
                            <IconButton
                                aria-label="delete"
                                onClick={onClickRemoveHandler}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    );
                }))}
            </div>
            <div>
                <Button
                    variant={props.filter === 'All' ? 'outlined' : 'text'}
                    color={props.filter === 'All' ? 'secondary' : 'primary'}
                    onClick={onAllClickHandler}
                >All
                </Button>
                <Button
                    variant={props.filter === 'Active' ? 'outlined' : 'text'}
                    color={props.filter === 'Active' ? 'secondary' : 'primary'}
                    onClick={onActiveClickHandler}
                >Active
                </Button>
                <Button
                    variant={props.filter === 'Completed' ? 'outlined' : 'text'}
                    color={props.filter === 'Completed' ? 'secondary' : 'primary'}
                    onClick={onCompletedClickHandler}
                >Completed
                </Button>
            </div>
        </div>
    );
}