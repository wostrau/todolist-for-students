// @ts-nocheck
import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Box,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {AppDispatch, AppRootStateType} from './store';
import {useDispatch, useSelector} from 'react-redux';
import {initializeAppTC, RequestStatusType} from './app-reducer';
import {Route, Routes} from 'react-router-dom';
import {Login} from '../features/TodolistsList/Login/Login';
import {logoutTC} from '../features/TodolistsList/Login/auth-reducer';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status);
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized);
    const useAppDispatch = () => useDispatch<AppDispatch>();
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    useEffect(() => {
        if (!demo) {
            dispatch(initializeAppTC());
        }
    }, []);

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC());
    }, []);

    if (!isInitialized) {
        return <div style={
            {
                position: 'fixed',
                width: '100%',
                top: '30%',
                textAlign: 'center'
            }
        }>
            <CircularProgress/>
        </div>
    }

    // @ts-ignore
    // @ts-ignore
    return (
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
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>LOG OUT</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
            </Box>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App;