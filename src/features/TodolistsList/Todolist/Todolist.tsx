import React, {useCallback, useEffect} from 'react';
import '../../../app/App.css';
import {changeFilterPropsType, TodolistDomainType} from '../todolists-reducer';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, IconButton} from '@mui/material';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';
import {useDispatch} from 'react-redux';
import {fetchTasksTC} from '../tasks-reducer';

type TodolistPropsType = {
    todolist: TodolistDomainType
    taskList: Array<TaskType>
    addTask: (title: string, todolistId: string) => void
    changeFilter: (value: changeFilterPropsType, id: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: TodolistPropsType) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (demo) {
            return;
        }
        const thunk = fetchTasksTC(props.todolist.id);
        dispatch(thunk);
    }, []);

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('All', props.todolist.id)
    }, [props.changeFilter, props.todolist.id]);

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('Active', props.todolist.id)
    }, [props.changeFilter, props.todolist.id]);

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('Completed', props.todolist.id)
    }, [props.changeFilter, props.todolist.id]);

    const onClickRemoveTodolistHandler = useCallback(() => {
        props.removeTodolist(props.todolist.id)
    }, [props.removeTodolist, props.todolist.id]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id]);

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }, [props.changeTodolistTitle, props.todolist.id]);

    let filterTask = props.taskList;

    if (props.todolist.filter === 'Active') {
        filterTask = props.taskList.filter((el => el.status === TaskStatuses.New))
    }
    if (props.todolist.filter === 'Completed') {
        filterTask = props.taskList.filter((el => el.status === TaskStatuses.Completed))
    }

    return (
        <div>
            <h3>
                <EditableSpan
                    title={props.todolist.title}
                    onChange={changeTodolistTitle}
                />
                <IconButton
                    aria-label="delete"
                    onClick={onClickRemoveTodolistHandler}
                    disabled={props.todolist.entityStatus === 'loading'}
                >
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm
                addItem={addTask}
                disabled={props.todolist.entityStatus === 'loading'}
            />
            <div>
                {filterTask.map(t => <Task
                    key={t.id}
                    task={t}
                    todolistId={props.todolist.id}
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                />)}
            </div>
            <div style={{paddingTop: '10px'}}>
                <Button
                    variant={props.todolist.filter === 'All' ? 'outlined' : 'text'}
                    color={props.todolist.filter === 'All' ? 'secondary' : 'primary'}
                    onClick={onAllClickHandler}
                >All
                </Button>
                <Button
                    variant={props.todolist.filter === 'Active' ? 'outlined' : 'text'}
                    color={props.todolist.filter === 'Active' ? 'secondary' : 'primary'}
                    onClick={onActiveClickHandler}
                >Active
                </Button>
                <Button
                    variant={props.todolist.filter === 'Completed' ? 'outlined' : 'text'}
                    color={props.todolist.filter === 'Completed' ? 'secondary' : 'primary'}
                    onClick={onCompletedClickHandler}
                >Completed
                </Button>
            </div>
        </div>
    );
});