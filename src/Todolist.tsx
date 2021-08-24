import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TodolistIdType, typeFilter} from "./App";
import {NewButton} from "./Components/NewButton";
import s from'./App.module.css'
import {NewInput} from "./Components/NewInput";


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
    addTask: (value:string, TodolistID:string) => void
    changeCheckbox:(checkbox:boolean, id:string, TodolistID:string) => void
    removeTodolist: (TodolistID:string) =>void
    filter:typeFilter
    TodolistID:string
}
//-----------------------------------------------------------------------------------

export function Todolist(props: PropsType) {
    let [value, setValue] = useState('')
    let [error, setError] = useState('')


    const todolistRemover = ()=> props.removeTodolist(props.TodolistID)
    // const charFooHandler = (filter:typeFilter)=>{
    //     props.changeTodolist(filterValue,props.TodolistID)
    // }
//-----------------------------------------------------------------------------------------------------------------
    return <div>
        <h3><span className={s.hTitle}>{props.title}</span><NewButton callback={todolistRemover} title={'X'}/></h3>
        <NewInput value={value} error={error} setValue={setValue} setError={setError} addTask={props.addTask} TodolistID={props.TodolistID}/>

        <ul>
            {props.tasks.map((mTasks) => {
                const taskRemover = ()=> props.removeTask(mTasks.id,props.TodolistID)
                const checkHandler = (e:ChangeEvent<HTMLInputElement>) => {
                    props.changeCheckbox(e.currentTarget.checked, mTasks.id, props.TodolistID )
                }
                let inputChecked = mTasks.isDone ? s.isDone : ''

                return (
                    <li key={mTasks.id} className={inputChecked} >
                        <NewButton callback={taskRemover} title={'X'}/>
                        <input  type="checkbox" checked={mTasks.isDone} onChange={checkHandler}/>
                        <span>{mTasks.title}</span>
                    </li>
                )
            })}
        </ul>

        <div>
            <NewButton callback={()=> props.changeTodolist('All',props.TodolistID)} title={'All'} filter={props.filter}/>
            <NewButton callback={()=> props.changeTodolist('Active',props.TodolistID)} title={'Active'} filter={props.filter}/>
            <NewButton callback={()=> props.changeTodolist('Completed',props.TodolistID)} title={'Completed'} filter={props.filter}/>
        </div>
    </div>
}
