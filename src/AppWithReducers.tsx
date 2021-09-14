import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeCheckboxAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
//-----------------------------------------------------------------------------------------
export type typeFilter = 'All' | 'Active' | 'Completed'
export type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type TodolistType = {
    id: string
    title: string
    filter: typeFilter
}

//-----------------------------------------------------------------------------------------
export function AppWithReducers() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>((state)=>state.todolists)
    const tasks = useSelector<AppRootState, TaskStateType>((state)=> state.tasks)


    const changeCheckbox = (checkbox: boolean, id: string, TodolistID: string) => {
        dispatch(changeCheckboxAC(checkbox, id, TodolistID))
    }
    const changeTaskTitle = (id: string, title:string,  TodolistID: string) => {
        dispatch(changeTaskTitleAC(id, title,  TodolistID))
    }
    const removeTask = (id: string, TodolistID: string) => {
        dispatch(removeTaskAC(id, TodolistID))
    }
    const addTask = (title: string, TodolistID: string) => {
        dispatch(addTaskAC(title, TodolistID))
    }
    const changeTodolist = (value: typeFilter, TodolistID: string) => {
        dispatch(changeTodolistFilterAC(value, TodolistID))

    }
    const changeTodolistTitle = (title:string, TodolistID: string) => {
        dispatch(changeTodolistTitleAC(title, TodolistID))

    }
    const removeTodolist = (TodolistID: string) => {
        const action = removeTodolistAC(TodolistID)
        dispatch(action)
    }
    const addTodoList = (title: string) =>{
        const action = addTodolistAC(title)
        dispatch(action)
    }
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
                        let filteredTasks = tasks[t.id]
                        if (t.filter === 'Active') {
                            filteredTasks = tasks[t.id].filter(f => !f.isDone)
                        }
                        if (t.filter === 'Completed') {
                            filteredTasks = tasks[t.id].filter(f => f.isDone)
                        }
                        return <Grid item>
                            <Paper elevation={10} style={{padding:"15px"}}>
                                <Todolist
                                    key={t.id}
                                    TodolistID={t.id}
                                    title={t.title}
                                    tasks={filteredTasks}
                                    removeTask={removeTask}
                                    changeTodolist={changeTodolist}
                                    addTask={addTask}
                                    changeCheckbox={changeCheckbox}
                                    filter={t.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
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


