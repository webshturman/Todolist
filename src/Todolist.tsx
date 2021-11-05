import React, {useCallback, useEffect} from 'react';
import {NewButton} from "./Components/NewButton";
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, addTaskTC, getTaskTC} from "./state/tasks-reducer";
import Task from "./Components/Task";
import {typeFilter} from "./state/todolists-reducer";
import {TaskObjectType, TaskStatuses} from "./api/task-api";


type PropsType = {
    title: string
    changeTodolist: (filter:typeFilter, TodolistID: string) =>void
    removeTodolist: (TodolistID:string) =>void
    changeTodolistTitle:(title:string, TodolistID: string)=>void
    filter:typeFilter
    TodolistID:string
}
//-----------------------------------------------------------------------------------

export const Todolist = React.memo((props: PropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TaskObjectType>>((state)=> state.tasks[props.TodolistID])
    //берем таски для конкретного тудулиста

    useEffect(()=>{
        dispatch(getTaskTC(props.TodolistID))
    },[])

//-----------------------------------------------------------------------------------------------------------------------
    const todolistRemover = useCallback(()=> props.removeTodolist(props.TodolistID),[props.removeTodolist, props.TodolistID])
    const changeTdlButton = useCallback((filter:typeFilter) => props.changeTodolist(filter, props.TodolistID), [props.changeTodolist,props.TodolistID])
    const newAddTask = useCallback((title:string)=> dispatch(addTaskTC(props.TodolistID,title)),[dispatch])
    const newTodolistTitle = useCallback((title:string)=> props.changeTodolistTitle(title, props.TodolistID),[props.changeTodolistTitle, props.TodolistID])

    let filteredTasks = tasks
    if (props.filter === 'Active') {
        filteredTasks = tasks.filter(f => f.status === TaskStatuses.New)
    }
    if (props.filter === 'Completed') {
        filteredTasks = tasks.filter(f => f.status === TaskStatuses.Completed)
    }
//-----------------------------------------------------------------------------------------------------------------
    return <div>
        <h3><EditableSpan name={props.title} changeTitle={newTodolistTitle}/>
            <IconButton size={'medium'}  onClick={todolistRemover} style={{padding:"5px",fontSize:"1rem"}}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm  addItem={newAddTask} />

        <ul style={{listStyle:"none", padding:"0"}}>

            {filteredTasks.map((mTasks) => {
                return <Task key={mTasks.id} TaskID={mTasks.id} TodolistID={props.TodolistID}/>
            })}
        </ul>

        <div>
            <NewButton callback={useCallback(()=> changeTdlButton('All'),[changeTdlButton])} title={'All'} filter={props.filter}/>
            <NewButton callback={useCallback(()=> changeTdlButton('Active'),[changeTdlButton])} title={'Active'} filter={props.filter}/>
            <NewButton callback={useCallback(()=> changeTdlButton('Completed'),[changeTdlButton])} title={'Completed'} filter={props.filter}/>
        </div>
    </div>
})
