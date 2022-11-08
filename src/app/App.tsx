import React from 'react';
import './App.css';
import {AppBar, Box, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {AppRootStateType} from './store';
import {useSelector} from 'react-redux';
import {RequestStatusType} from './app-reducer';
import {BrowserRouter, Route} from 'react-router-dom';
import {Login} from '../features/TodolistsList/Login/Login';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status);

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
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
                        {status === 'loading' && <LinearProgress/>}
                    </AppBar>
                </Box>
                <Container fixed>
                    <Route path={} render={()=>{<TodolistsList demo={demo}/>}}/>
                    <Route path={} render={()=>{<Login/>}}/>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;