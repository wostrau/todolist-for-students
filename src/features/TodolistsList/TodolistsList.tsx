import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType} from '../../app/store';
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

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
    const useAppDispatch = () => useDispatch<AppDispatch>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(fetchTodolistsTC());
    }, []);

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(title, todolistId));
    }, []);
    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskTC(taskId, todolistId));
    }, []);
    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {status: status}, todolistId));
    }, []);
    const changeTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {title: newTitle}, todolistId));
    }, []);
    const changeFilter = useCallback((value: changeFilterPropsType, todolistId: string) => {
        dispatch(changeFilterTodolistAC(todolistId, value));
    }, []);
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId));
    }, []);
    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTitleTodolistTC(todolistId, newTitle));
    }, []);
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
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
                        <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    todolist={tl}
                                    taskList={filterTask}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTitle}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    )
};