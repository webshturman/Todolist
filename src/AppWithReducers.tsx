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
import {RequestStatusType} from "./state/loader-reducer";
import {TodoListContainer} from "./features/TodolistsList/TodolistsList";
import {Route, Routes} from "react-router-dom";
import {Login} from "./features/Login";
import {getAuthData} from "./state/auth-reducer";

//-----------------------------------------------------------------------------------------
export function AppWithReducers() {

    const status = useSelector<AppRootState, RequestStatusType>((state) => state.loader.status)
    const isLoggedIn = useSelector<AppRootState, boolean>(state=> state.auth.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(getAuthData())
    },[])
    return (
        <div className="App">
            <AppBar position="static">
                <ErrorSnackBar/>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button
                        variant={"outlined"}
                        color="inherit"
                    >
                        {isLoggedIn ?   'UserName' : 'LogOut'}
                    </Button>
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


