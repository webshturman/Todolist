import React, {ChangeEvent} from 'react';
import {TaskStateType, typeFilter} from "./AppWithReducers";
import {NewButton} from "./Components/NewButton";
import s from'./App.module.css'
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeCheckboxAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    // tasks: Array<TaskType>
    // removeTask: (id:string, TodolistID:string) => void
    changeTodolist: (filter:typeFilter, TodolistID: string) =>void
    // addTask: (title:string, TodolistID:string) => void
    // changeCheckbox:(checkbox:boolean, id:string, TodolistID:string) => void
    removeTodolist: (TodolistID:string) =>void
    // changeTaskTitle: (id: string, title:string,  TodolistID: string) => void
    changeTodolistTitle:(title:string, TodolistID: string)=>void
    filter:typeFilter
    TodolistID:string
}
//-----------------------------------------------------------------------------------

export function Todolist(props: PropsType) {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TaskType>>((state)=> state.tasks[props.TodolistID])
    //берем таски для конкретного тудулиста

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
    //----------------------------------------------------------------------------------------------------
    const todolistRemover = ()=> props.removeTodolist(props.TodolistID)
    const changeTdlButton = (filter:typeFilter) => props.changeTodolist(filter, props.TodolistID)
    const newAddTask = (title:string)=> dispatch(addTaskAC(title, props.TodolistID))
    // const newAddTask = (title:string)=> props.addTask(title, props.TodolistID)
    const newTodolistTitle = (title:string)=> props.changeTodolistTitle(title, props.TodolistID)
    let filteredTasks = tasks
    if (props.filter === 'Active') {
        filteredTasks = tasks.filter(f => !f.isDone)
    }
    if (props.filter === 'Completed') {
        filteredTasks = tasks.filter(f => f.isDone)
    }
//-----------------------------------------------------------------------------------------------------------------
    return <div>
        <h3><EditableSpan name={props.title} changeTitle={newTodolistTitle}/>
            <IconButton size={'medium'}  onClick={todolistRemover} style={{padding:"5px",fontSize:"1rem"}}>
                <Delete/>
            </IconButton>
            {/*<NewButton callback={todolistRemover} title={'X'}/>*/}
        </h3>
        <AddItemForm  addItem={newAddTask} />

        <ul style={{listStyle:"none", padding:"0"}}>

            {filteredTasks.map((mTasks) => {
                const taskRemover = ()=> dispatch(removeTaskAC(mTasks.id,props.TodolistID))
                // const taskRemover = ()=> props.removeTask(mTasks.id,props.TodolistID)
                const checkHandler = (e:ChangeEvent<HTMLInputElement>) => {
                    dispatch(changeCheckboxAC(e.currentTarget.checked, mTasks.id, props.TodolistID))
                    // props.changeCheckbox(e.currentTarget.checked, mTasks.id, props.TodolistID )
                }
                const changeTitle = (title:string) => dispatch(changeTaskTitleAC(mTasks.id, title, props.TodolistID))
                // const changeTitle = (title:string) => props.changeTaskTitle(mTasks.id, title, props.TodolistID)
                let inputChecked = mTasks.isDone ? s.isDone : ''

                return (
                    <li key={mTasks.id} className={inputChecked} >
                        <IconButton size={'small'}  onClick={taskRemover}>
                            <Delete/>
                        </IconButton>
                        <Checkbox checked={mTasks.isDone} onChange={checkHandler} size={'small'} color={'primary'}/>
                        {/*<input  type="checkbox" checked={mTasks.isDone} onChange={checkHandler}/>*/}
                        <EditableSpan name={mTasks.title} changeTitle={changeTitle}/>
                    </li>
                )
            })}
        </ul>

        <div>
            <NewButton callback={()=> changeTdlButton('All')} title={'All'} filter={props.filter}/>
            <NewButton callback={()=> changeTdlButton('Active')} title={'Active'} filter={props.filter}/>
            <NewButton callback={()=> changeTdlButton('Completed')} title={'Completed'} filter={props.filter}/>
        </div>
    </div>
}
