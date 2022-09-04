import React, {useCallback, useState} from 'react';
import '../App.css';
import {changeFilterPropsType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, IconButton} from '@mui/material';
import {Task, TaskType} from './Task';

type TodolistPropsType = {
    id: string
    title: string
    taskList: Array<TaskType>
    addTask: (title: string, todolistId: string) => void
    changeFilter: (value: changeFilterPropsType, id: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: changeFilterPropsType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
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

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('All', props.id)
    }, [props.changeFilter, props.id]);

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('Active', props.id)
    }, [props.changeFilter, props.id]);

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('Completed', props.id)
    }, [props.changeFilter, props.id]);

    const onClickRemoveTodolistHandler = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id]);

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id]);

    let filterTask = props.taskList;

    if (props.filter === 'Active') {
        filterTask = props.taskList.filter((el => !el.isDone))
    }
    if (props.filter === 'Completed') {
        filterTask = props.taskList.filter((el => el.isDone))
    }

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
                {props.taskList.map(t => <Task
                    key={t.id}
                    task={t}
                    todolistId={props.id}
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                />)}
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
});