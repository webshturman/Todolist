import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
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
    const TodolistID1 = v1()
    const TodolistID2 = v1()
    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: TodolistID1, title: 'What to learn', filter: 'All'},
        {id: TodolistID2, title: 'What to learn Extra', filter: 'All'}
    ])
    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
            [TodolistID1]: [
                {id: v1(), title: "Javascript", isDone: true},
                {id: v1(), title: "Node JS", isDone: false},
                {id: v1(), title: "React", isDone: true},
            ],
            [TodolistID2]: [
                {id: v1(), title: "HTML", isDone: false},
                {id: v1(), title: "CSS", isDone: false},
                {id: v1(), title: "Angular", isDone: true}
            ]
        })

    const changeCheckbox = (checkbox: boolean, id: string, TodolistID: string) => {
        dispatchTasks(changeCheckboxAC(checkbox, id, TodolistID))
    }
    const changeTaskTitle = (id: string, title:string,  TodolistID: string) => {
        dispatchTasks(changeTaskTitleAC(id, title,  TodolistID))
    }
    const removeTask = (id: string, TodolistID: string) => {
        dispatchTasks(removeTaskAC(id, TodolistID))
    }
    const addTask = (title: string, TodolistID: string) => {
        dispatchTasks(addTaskAC(title, TodolistID))
    }
    const changeTodolist = (value: typeFilter, TodolistID: string) => {
        dispatchTodolists(changeTodolistFilterAC(value, TodolistID))

    }
    const changeTodolistTitle = (title:string, TodolistID: string) => {
        dispatchTodolists(changeTodolistTitleAC(title, TodolistID))

    }
    const removeTodolist = (TodolistID: string) => {
        const action = removeTodolistAC(TodolistID)
        dispatchTodolists(action)
        dispatchTasks(action)
    }
    const addTodoList = (title: string) =>{
        const action = addTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)

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


