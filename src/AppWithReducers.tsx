import React, {useEffect} from 'react';
import './App.css';
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Menu} from "@material-ui/icons";

import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {ErrorSnackBar} from "./Components/ErrorSnackBar";
import {getAuthData, RequestStatusType} from "./state/loader-reducer";
import {TodoListContainer} from "./features/TodolistsList/TodolistsList";
import {Route, Routes} from "react-router-dom";
import {Login} from "./features/Login";
import {setLogOutData} from "./state/auth-reducer";
import {CircularProgress} from "@mui/material";

//-----------------------------------------------------------------------------------------
export function AppWithReducers() {

    const status = useSelector<AppRootState, RequestStatusType>((state) => state.loader.status)
    const isLoggedIn = useSelector<AppRootState, boolean>(state=> state.auth.isLoggedIn)
    const isInitialized = useSelector<AppRootState, boolean>(state=> state.loader.isInitialized)

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getAuthData())
    },[])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <AppBar position="static">
                <ErrorSnackBar/>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    {isLoggedIn ?
                    <Button variant={"outlined"} color="inherit" onClick={()=> dispatch(setLogOutData())}>LogOut</Button>
                        : <div></div>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodoListContainer/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/*'} element={<div>404</div>}/>
                </Routes>
            </Container>
        </div>
    );
}


