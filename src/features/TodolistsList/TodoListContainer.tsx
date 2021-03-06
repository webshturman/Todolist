import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {
    addTodosTC,
    changeTodolistFilterAC,
    deleteTodosTC,
    getTodosTC,
    TodolistStateType,
    typeFilter,
    updateTodosTitleTC
} from "../../state/todolists-reducer";
import {AppRootState} from "../../state/store";
import {Todolist} from "./Todolist";
import {AddItemForm} from "../../Components/AddItemForm";
import {Navigate} from "react-router-dom";



//-----------------------------------------------------------------------------------------
export function TodoListContainer() {

    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
    const todoLists = useSelector<AppRootState, Array<TodolistStateType>>((state) => state.todoLists)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(getTodosTC())
    }, [])


    const changeTodolist = useCallback((newTodolistFilter: typeFilter, todolistId: string ) => {
        dispatch(changeTodolistFilterAC({newTodolistFilter, todolistId}))
    }, [dispatch])
    const changeTodolistTitle = useCallback((title: string, TodolistID: string) => {
        dispatch(updateTodosTitleTC(title, TodolistID))
    }, [dispatch])
    const removeTodolist = useCallback((TodolistID: string) => {
        dispatch(deleteTodosTC(TodolistID))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodosTC(title))
    }, [dispatch])

    if(!isLoggedIn){
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: "15px 0", justifyContent: "center"}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={1}>
                {todoLists.map(todolist => {
                    return <Grid item key={todolist.id}>
                        <Paper elevation={10} style={{padding: "10px"}}>
                            <Todolist
                                key={todolist.id}
                                TodolistID={todolist.id}
                                entityStatus={todolist.entityStatus}
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
        </>
    );
}


