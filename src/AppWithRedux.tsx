import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import {
    addTodolistTC,
    changeFilterPropsType,
    changeFilterTodolistAC,
    changeTitleTodolistTC,
    fetchTodolistsTC,
    removeTodolistTC,
    TodolistDomainType
} from './state/todolists-reducer';
import {addTaskTC, removeTaskTC, updateTaskTC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskStatuses, TaskType, todolistsAPI} from './api/todolists-api';

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasksObj = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        const thunk = fetchTodolistsTC();
        dispatch(thunk);
    }, []);

    const addTask = useCallback((title: string, todolistId: string) => {
        const thunk = addTaskTC(title, todolistId);
        dispatch(thunk);
    }, []);

    const removeTask = useCallback((id: string, todolistId: string) => {
        todolistsAPI.deleteTask(id, todolistId)
            .then((res) => {
                    const thunk = removeTaskTC(id, todolistId);
                    dispatch(thunk);
                }
            )
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
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            preferences
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm
                        addItem={addTodolist}
                    />
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((el: TodolistDomainType) => {
                        let filterTask = tasksObj[el.id];
                        return (
                            <Grid item>
                                <Paper style={{padding: '20px'}}>
                                    <Todolist
                                        key={el.id}
                                        id={el.id}
                                        title={el.title}
                                        taskList={filterTask}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTitle}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        filter={el.filter}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;