import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {
    addTodosTC,
    deleteTodosTC,
    getTodosTC,
    TodolistStateType,
    typeFilter,
    updateTodosTitleTC
} from "../../state/todolists-reducer";
import {AppRootState} from "../../state/store";
import {Todolist} from "./Todolist";
import {AddItemForm} from "../../Components/AddItemForm";
import {changeTodolistFilterAC} from "../../state/actions";


//-----------------------------------------------------------------------------------------
export function TodoListContainer() {

    const isLoggedIn = useSelector<AppRootState, boolean>(state=> state.auth.isLoggedIn)

    useEffect(()=> {
        if(!isLoggedIn){
            return
        }
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

    // if(!isLoggedIn){
    //     return <Redirect to={'/login'}/>
    // }

    return (
        <>
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


