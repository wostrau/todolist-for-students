import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Components/Todolist';
import {v4 as uuid4} from 'uuid';
import {AddItemForm} from './Components/AddItemForm';
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import {TaskType} from './Components/Task';

export type changeFilterPropsType = 'All' | 'Active' | 'Completed'

export type todolistPropsType = {
    id: string
    title: string
    filter: changeFilterPropsType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolistId1 = uuid4();
    const todolistId2 = uuid4();
    const [todolists, setTodolist] = useState<Array<todolistPropsType>>([
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]);
    const [tasksObj, setTask] = useState<TaskStateType>({
        [todolistId1]: [
            {id: uuid4(), title: 'REACT JS', isDone: false},
            {id: uuid4(), title: 'TYPESCRIPT', isDone: false},
        ],
        [todolistId2]: [
            {id: uuid4(), title: 'MONITOR', isDone: false},
            {id: uuid4(), title: 'COMPUTER', isDone: true},
        ],
    });

    function addTask(title: string, todolistId: string) {
        let newTask = {id: uuid4(), title: title, isDone: false};
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

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const tasks = tasksObj[todolistId];
        let task = tasks.find(el => el.id === taskId);
        if (task) {
            task.isDone = isDone;
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
        const todolist: todolistPropsType = {
            id: uuid4(),
            filter: 'All',
            title: title
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
                            filterTask = filterTask.filter(el => !el.isDone)
                        }
                        if (el.filter === 'Completed') {
                            filterTask = filterTask.filter(el => el.isDone)
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

/*
import React from 'react';
import './App.css';
import Todolist, {taskPropsType} from './Components/Todolist';
import {v4 as uuid4} from 'uuid';
import AddItemForm from './Components/AddItemForm';
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import {userReducer} from './State/user-reducer';
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from './State/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './State/tasks-reducer';

export type changeFilterPropsType = 'All' | 'Active' | 'Completed'

// export type todolistPropsType = {
//     id: string
//     title: string
//     filter: changeFilterPropsType
// }

// export type TaskStateType = {
//     [key: string]: Array<taskPropsType>
// }

function AppWithReducers() {
    const todolistId1 = uuid4();
    const todolistId2 = uuid4();
    const [todolists, dispatchToTodolistsReducer] = userReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]);
    const [tasksObj, dispatchToTasksReducer] = userReducer(tasksReducer, {
        [todolistId1]: [
            {id: uuid4(), title: 'REACT JS', isDone: false},
            {id: uuid4(), title: 'TYPESCRIPT', isDone: false},
        ],
        [todolistId2]: [
            {id: uuid4(), title: 'MONITOR', isDone: false},
            {id: uuid4(), title: 'COMPUTER', isDone: true},
        ],
    });

    function addTask(title: string, todolistId: string) {
        dispatchToTasksReducer(addTaskAC(title, todolistId));
    }

    function removeTask(id: string, todolistId: string) {
        dispatchToTasksReducer(removeTaskAC(id, todolistId));
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatchToTasksReducer(changeTaskStatusAC(taskId, todolistId, isDone));
    }

    function changeTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, todolistId, newTitle));
    }

    function changeFilter(value: changeFilterPropsType, todolistId: string) {
        dispatchToTodolistsReducer(changeFilterTodolistAC(todolistId, value));
    }

    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId);
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action);
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        dispatchToTodolistsReducer(changeTitleTodolistAC(todolistId, newTitle));
    }

    function addTodolist(title: string) {
        dispatchToTodolistsReducer(addTodolistAC(title));
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
                    {todolists.map((el: todolistPropsType) => {
                        let filterTask = tasksObj[el.id];
                        if (el.filter === 'Active') {
                            filterTask = filterTask.filter(el => !el.isDone)
                        }
                        if (el.filter === 'Completed') {
                            filterTask = filterTask.filter(el => el.isDone)
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

export default AppWithReducers;*/
