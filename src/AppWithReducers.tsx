import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {ErrorSnackBar} from "./Components/ErrorSnackBar";
import {RequestStatusType} from "./state/loader-reducer";
import {TodoListContainer} from "./features/TodolistsList/TodolistsList";
import {Route, Routes} from "react-router-dom";
import {Login} from "./features/Login";

//-----------------------------------------------------------------------------------------
export function AppWithReducers() {

    const status = useSelector<AppRootState, RequestStatusType>((state) => state.loader.status)

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
                        Login
                    </Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'}>
                        <TodoListContainer/>
                    </Route>
                    <Route path={'login'} element={<Login/>}/>
                </Routes>
            </Container>
        </div>
    );
}


