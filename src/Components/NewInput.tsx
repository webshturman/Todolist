import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from '../App.module.css'


export type InputType = {
    value: string
    setError: (error: string) => void
    setValue: (value: string) => void
    error: string
    addTask: (value: string) => void
}
export const NewInput: React.FC<InputType> = ({value, setError, setValue, error, addTask}) => {
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
            addTask(value)
            setValue('')
        } else {
            setError('Type some text')
        }
    }
    const inputClasses = error ? s.errorInput : s.nonErrorInput
    return <div>
            <input className={inputClasses} value={value} onChange={changeInputValue} onKeyPress={onKeyHandler}/>
    </div>
}

