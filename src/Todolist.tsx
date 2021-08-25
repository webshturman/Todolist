import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TodolistIdType, typeFilter} from "./App";
import {NewButton} from "./Components/NewButton";
import s from'./App.module.css'
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id:string, TodolistID:string) => void
    changeTodolist: (filter:typeFilter, TodolistID: string) =>void
    addTask: (title:string, TodolistID:string) => void
    changeCheckbox:(checkbox:boolean, id:string, TodolistID:string) => void
    removeTodolist: (TodolistID:string) =>void
    refreshingTaskTitle: (id: string, title:string,  TodolistID: string) => void
    refreshTodolistTitle:(title:string, TodolistID: string)=>void
    filter:typeFilter
    TodolistID:string
}
//-----------------------------------------------------------------------------------

export function Todolist(props: PropsType) {

    const todolistRemover = ()=> props.removeTodolist(props.TodolistID)
    const changeTdlButton = (filter:typeFilter) => props.changeTodolist(filter,props.TodolistID)
    const newAddTask = (title:string)=> props.addTask(title, props.TodolistID)
    const newTodolistTitle = (title:string)=> props.refreshTodolistTitle(title, props.TodolistID)

//-----------------------------------------------------------------------------------------------------------------
    return <div>
        <h3><EditableSpan name={props.title} refreshingTitle={newTodolistTitle}/> <NewButton callback={todolistRemover} title={'X'}/></h3>
        <AddItemForm  addItem={newAddTask} />

        <ul>
            {props.tasks.map((mTasks) => {
                const taskRemover = ()=> props.removeTask(mTasks.id,props.TodolistID)
                const checkHandler = (e:ChangeEvent<HTMLInputElement>) => {
                    props.changeCheckbox(e.currentTarget.checked, mTasks.id, props.TodolistID )
                }
                const refreshTitle = (title:string) => props.refreshingTaskTitle(mTasks.id, title, props.TodolistID)
                let inputChecked = mTasks.isDone ? s.isDone : ''

                return (
                    <li key={mTasks.id} className={inputChecked} >
                        <NewButton callback={taskRemover} title={'X'}/>
                        <input  type="checkbox" checked={mTasks.isDone} onChange={checkHandler}/>
                        <EditableSpan name={mTasks.title} refreshingTitle={refreshTitle}/>
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
