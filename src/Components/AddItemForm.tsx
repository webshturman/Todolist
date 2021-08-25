import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from '../App.module.css'
import {NewButton} from "./NewButton";


export type InputType = {
    addItem: (title: string) => void

}
export const AddItemForm: React.FC<InputType> = ({ addItem}) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState('')
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        let currentValue = e.currentTarget.value
        if (!currentValue.trim()) {
            setError('Type some text')
            setTitle('')
        } else {
            setTitle(currentValue)
            setError('')
        }
    }
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title) {
            addItem(title)
            setTitle('')
        } else {
            setError('Type some text')
        }
    }
    const addHandler = () => {
        if (title) {
            addItem(title)
            setTitle('')
        } else {
            setError('Type some text')
        }
    }
    const inputClasses = error ? s.errorInput : s.nonErrorInput
    return (
        <div>
            <div>
                <input className={inputClasses} value={title} onChange={changeInputValue} onKeyPress={onKeyHandler}/>
                <NewButton callback={addHandler} title={'+'}/>
            </div>
            <div className={s.errorMessage}>{error}</div>
        </div>
    )
}

