import React from 'react';
import './App.css';
import {AppBar, Box, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {CustomizedSnackbars} from '../components/ErrorSnackbar/ErrorSnackbar';
import {AppRootStateType} from './store';
import {useSelector} from 'react-redux';
import {RequestStatusType} from './app-reducer';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status);

    return (
        <div className="App">
            <CustomizedSnackbars/>
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
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
}

export default App;