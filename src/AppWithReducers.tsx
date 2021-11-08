import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodosTC,
    changeTodolistFilterAC,
    deleteTodosTC,
    getTodosTC,
    TodolistStateType,
    typeFilter,
    updateTodosTitleTC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TaskObjectType} from "./api/task-api";

//-----------------------------------------------------------------------------------------


export type TaskStateType = {
    [key: string]: Array<TaskObjectType>
}

//-----------------------------------------------------------------------------------------
export function AppWithReducers() {
    useEffect(()=> {
        dispatch(getTodosTC())
    },[])

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodolistStateType>>((state)=>state.todoLists)

    const changeTodolist = useCallback((value: typeFilter, TodolistID: string) => {
        dispatch(changeTodolistFilterAC(value, TodolistID))
    }, [dispatch])
    const changeTodolistTitle = useCallback((title:string, TodolistID: string) => {
        dispatch(updateTodosTitleTC(title, TodolistID))
    },[dispatch])
    const removeTodolist = useCallback((TodolistID: string) => {
        dispatch(deleteTodosTC(TodolistID))
    },[dispatch])
    const addTodoList = useCallback((title: string) =>{
        dispatch(addTodosTC(title))
    },[dispatch])
    return (
        <div className="App">
            <AppBar position="static">
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
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"15px 0", justifyContent: "center"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={1}>
                    {todoLists.map(todolist => {

                        return <Grid item key={todolist.id}>
                            <Paper elevation={10} style={{padding:"10px"}}>
                                <Todolist
                                    key={todolist.id}
                                    TodolistID={todolist.id}
                                    title={todolist.title}
                                    changeTodolist={changeTodolist}
                                    filter={todolist.filter}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}


