import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, getTodosAC,
    removeTodolistAC, TodolistStateType, typeFilter,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TodoListAPI} from "./api/todolist-api";
//-----------------------------------------------------------------------------------------

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


//-----------------------------------------------------------------------------------------
export function AppWithReducers() {
    useEffect(()=> {
        TodoListAPI.getTodos()
        .then((res)=>{
            // debugger
            dispatch(getTodosAC(res.data))
        })
    },[])

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistStateType>>((state)=>state.todolists)

    const changeTodolist = useCallback((value: typeFilter, TodolistID: string) => {
        dispatch(changeTodolistFilterAC(value, TodolistID))
    }, [dispatch])
    const changeTodolistTitle = useCallback((title:string, TodolistID: string) => {
        dispatch(changeTodolistTitleAC(title, TodolistID))
    },[dispatch])
    const removeTodolist = useCallback((TodolistID: string) => {
        const action = removeTodolistAC(TodolistID)
        dispatch(action)
    },[dispatch])
    const addTodoList = useCallback((title: string) =>{
        const action = addTodolistAC(title)
        dispatch(action)
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
                    {todolists.map(t => {

                        return <Grid item key={t.id}>
                            <Paper elevation={10} style={{padding:"15px"}}>
                                <Todolist
                                    key={t.id}
                                    TodolistID={t.id}
                                    title={t.title}
                                    changeTodolist={changeTodolist}
                                    filter={t.filter}
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


