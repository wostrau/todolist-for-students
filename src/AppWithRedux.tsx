import React, {useCallback} from 'react';
import './App.css';
import {taskPropsType, Todolist} from './Components/Todolist';
import {AddItemForm} from './Components/AddItemForm';
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC
} from './State/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './State/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './State/store';

export type changeFilterPropsType = 'All' | 'Active' | 'Completed'

export type todolistPropsType = {
    id: string
    title: string
    filter: changeFilterPropsType
}

export type TaskStateType = {
    [key: string]: Array<taskPropsType>
}

function AppWithRedux() {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<todolistPropsType>>(state => state.todolists);
    const tasksObj = useSelector<AppRootState, TaskStateType>(state => state.tasks);

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId));
    }

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId));
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskId, todolistId, isDone));
    }

    function changeTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(taskId, todolistId, newTitle));
    }

    function changeFilter(value: changeFilterPropsType, todolistId: string) {
        dispatch(changeFilterTodolistAC(todolistId, value));
    }

    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId);
        dispatch(action);
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        dispatch(changeTitleTodolistAC(todolistId, newTitle));
    }

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
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
                    {todolists.map((el: todolistPropsType) => {
                        let filterTask = tasksObj[el.id];
                        if (el.filter === 'Active') {
                            filterTask = filterTask.filter((el => !el.isDone))
                        }
                        if (el.filter === 'Completed') {
                            filterTask = filterTask.filter((el => el.isDone))
                        }
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