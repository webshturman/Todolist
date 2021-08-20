import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {typeFilter} from "./App";
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
    changeFilter: (filter:typeFilter) =>void
    addTask: (value:string, TodolistID:string) => void
    changeCheckbox:(checkbox:boolean, id:string, TodolistID:string) => void
    filter:typeFilter
}
//-----------------------------------------------------------------------------------

export function Todolist(props: PropsType) {
    let [value, setValue] = useState('')
    let [error, setError] = useState('')

    const addHandler = ()=> {
        if(value) {
            props.addTask(value,TodolistID)
            setValue('')
        } else{
            setError('Type some text')
        }
    }

    // const charFooHandler = (filterValue:typeFilter)=>{
    //     props.changeFilter(filterValue)
    // }
//-----------------------------------------------------------------------------------------------------------------
    return <div>
        <h3>{props.title}</h3>
        <div className={s.common }>
            <NewInput value={value} error={error} setValue={setValue} setError={setError} addTask={props.addTask}/>
            <NewButton callback={addHandler} title={'+'}/>
        </div>
        <div className={s.errorMessage}>{error}</div>
        <ul>
            {props.tasks.map((mTasks) => {
                // debugger
                const checkHandler = (e:ChangeEvent<HTMLInputElement>) => {
                    props.changeCheckbox(e.currentTarget.checked, mTasks.id, TodolistID )
                }
                let inputChecked = mTasks.isDone ? s.isDone : ''

                return (
                    <li key={mTasks.id} className={inputChecked} >
                        <NewButton callback={()=> props.removeTask(mTasks.id)} title={'X'}/>
                        <input  type="checkbox" checked={mTasks.isDone} onChange={checkHandler}/>
                        <span>{mTasks.title}</span>
                    </li>
                )
            })}
        </ul>

        <div>
            <NewButton callback={()=> props.changeFilter('All')} title={'All'} filter={props.filter}/>
            <NewButton callback={()=> props.changeFilter('Active')} title={'Active'} filter={props.filter}/>
            <NewButton callback={()=> props.changeFilter('Completed')} title={'Completed'} filter={props.filter}/>
        </div>
    </div>
}
