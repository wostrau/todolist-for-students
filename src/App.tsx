import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v4 as uuid4} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import {TaskPriorities, TaskStatuses, TaskType} from './api/todolists-api';
import {changeFilterPropsType, TodolistDomainType} from './state/todolists-reducer';

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolistId1 = uuid4();
    const todolistId2 = uuid4();
    const [todolists, setTodolist] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: 'What to learn', filter: 'All', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'All', addedDate: '', order: 0},
    ]);
    const [tasksObj, setTask] = useState<TaskStateType>({
        [todolistId1]: [
            {
                id: uuid4(),
                todolistId: todolistId1,
                title: 'REACT',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: ''
            },
            {
                id: uuid4(),
                todolistId: todolistId1,
                title: 'TYPESCRIPT',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: ''
            },
        ],
        [todolistId2]: [
            {
                id: uuid4(),
                todolistId: todolistId2,
                title: 'MONITOR',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: ''
            },
            {
                id: uuid4(),
                todolistId: todolistId2,
                title: 'COMPUTER',
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Later,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: ''
            },
        ],
    });

    function addTask(title: string, todolistId: string) {
        let newTask = {
            id: uuid4(),
            todolistId: todolistId,
            title: title,
            order: 0,
            status: TaskStatuses.New,
            priority: TaskPriorities.Middle,
            addedDate: '',
            startDate: '',
            deadline: '',
            description: ''
        };
        const tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTask({...tasksObj});
    }

    function removeTask(id: string, todolistId: string) {
        const tasks = tasksObj[todolistId];
        const filteredTask = tasks.filter((el) => el.id !== id);
        tasksObj[todolistId] = filteredTask;
        setTask({...tasksObj});
    }

    function changeStatus(taskId: string, status: TaskStatuses, todolistId: string) {
        const tasks = tasksObj[todolistId];
        let task = tasks.find(el => el.id === taskId);
        if (task) {
            task.status = status;
            setTask({...tasksObj});
        }
    }

    function changeTitle(taskId: string, newTitle: string, todolistId: string) {
        const tasks = tasksObj[todolistId];
        let task = tasks.find(el => el.id === taskId);
        if (task) {
            task.title = newTitle;
            setTask({...tasksObj});
        }
    }

    function changeFilter(value: changeFilterPropsType, todolistId: string) {
        let todolist = todolists.find((el: { id: string; }) => el.id === todolistId);
        if (todolist) {
            todolist.filter = value
            setTodolist([...todolists]);
        }
    }

    function removeTodolist(todolistId: string) {
        let filteredTodolist = todolists.filter(el => el.id !== todolistId);
        setTodolist(filteredTodolist);
        delete tasksObj[todolistId];
        setTask({...tasksObj});
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const todolist = todolists.find(el => el.id === todolistId);
        if (todolist) {
            todolist.title = newTitle;
            setTodolist([...todolists]);
        }
    }

    function addTodolist(title: string) {
        const todolist: TodolistDomainType = {
            id: uuid4(),
            filter: 'All',
            title: title,
            addedDate: '',
            order: 0
        };
        setTodolist([...todolists, todolist])
        setTask({
            ...tasksObj,
            [todolist.id]: []
        })
    }

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
                            preferances
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
                    {todolists.map((el) => {
                        let filterTask = tasksObj[el.id];
                        if (el.filter === 'Active') {
                            filterTask = filterTask.filter(el => el.status === TaskStatuses.New
                        )
                        }
                        if (el.filter === 'Completed') {
                            filterTask = filterTask.filter(el => el.status === TaskStatuses.Completed)
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

export default App;