import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {
    addTodolistTC,
    changeFilterPropsType,
    changeFilterTodolistAC,
    changeTitleTodolistTC,
    fetchTodolistsTC,
    removeTodolistTC,
    TodolistDomainType
} from './todolists-reducer';
import {addTaskTC, removeTaskTC, TaskStateType, updateTaskTC} from './tasks-reducer';
import {TaskStatuses} from '../../api/todolists-api';
import {Grid, Paper} from '@mui/material';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';

export const TodolistsList: React.FC = (props) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        const thunk = fetchTodolistsTC();
        dispatch(thunk);
    }, []);

    const addTask = useCallback((title: string, todolistId: string) => {
        const thunk = addTaskTC(title, todolistId);
        dispatch(thunk);
    }, []);
    const removeTask = useCallback((taskId: string, todolistId: string) => {
        const thunk = removeTaskTC(taskId, todolistId);
        dispatch(thunk);
    }, []);
    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        const thunk = updateTaskTC(taskId, {status: status}, todolistId);
        dispatch(thunk);
    }, []);
    const changeTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        const thunk = updateTaskTC(taskId, {title: newTitle}, todolistId)
        dispatch(thunk);
    }, []);
    const changeFilter = useCallback((value: changeFilterPropsType, todolistId: string) => {
        dispatch(changeFilterTodolistAC(todolistId, value));
    }, [dispatch]);
    const removeTodolist = useCallback((todolistId: string) => {
        const thunk = removeTodolistTC(todolistId);
        dispatch(thunk);
    }, []);
    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        const thunk = changeTitleTodolistTC(todolistId, newTitle);
        dispatch(thunk);
    }, []);
    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title);
        dispatch(thunk);
    }, []);

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm
                    addItem={addTodolist}
                />
            </Grid>
            <Grid container spacing={3}>
                {todolists.map((tl: TodolistDomainType) => {
                    let filterTask = tasks[tl.id];
                    return (
                        <Grid item>
                            <Paper style={{padding: '20px'}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    taskList={filterTask}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTitle}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                    filter={tl.filter}
                                />
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    )
};