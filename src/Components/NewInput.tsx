import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from '../App.module.css'
import {NewButton} from "./NewButton";


export type InputType = {
    value: string
    setError: (error: string) => void
    setValue: (value: string) => void
    error: string
    addTask: (value: string,TodolistID:string) => void
    TodolistID:string
}
export const NewInput: React.FC<InputType> = ({value, setError, setValue, error, addTask,  TodolistID}) => {
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        let currentValue = e.currentTarget.value.trim()
        if (!currentValue) {
            setError('Type some text')
            setValue('')
        } else {
            setValue(currentValue)
            setError('')
        }
    }
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value) {
            addTask(value,TodolistID)
            setValue('')
        } else {
            setError('Type some text')
        }
    }
    const addHandler = ()=> {
        if(value) {
           addTask(value,TodolistID)
            setValue('')
        } else{
            setError('Type some text')
        }
    }
    const inputClasses = error ? s.errorInput : s.nonErrorInput
    return (
        <>
            <div>
                <input className={inputClasses} value={value} onChange={changeInputValue} onKeyPress={onKeyHandler}/>
                <NewButton callback={addHandler} title={'+'}/>
            </div>
            <div className={s.errorMessage}>{error}</div>
        </>
        )
}

