import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from '../App.module.css'
import {IconButton, TextField} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


export type InputType = {
    addItem: (title: string) => void

}
export const AddItemForm: React.FC<InputType> = ({ addItem}) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState(false)
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        let currentValue = e.currentTarget.value
        if (!currentValue.trim()) {
            setError(true)
            setTitle('')
        } else {
            setTitle(currentValue)
            setError(false)
        }
    }
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title) {
            addItem(title)
            setTitle('')
        } else {
            setError(true)
        }
    }
    const addHandler = () => {
        if (title) {
            addItem(title)
            setTitle('')
        } else {
            setError(true)
        }
    }
    const inputClasses = error ? s.errorInput : s.nonErrorInput
    return (
        <div>
            <div>
                <TextField value={title} onChange={changeInputValue} size={'small'} label={'Title'}
                           onKeyPress={onKeyHandler} variant={'outlined'} style={{height:'20px'}}
                           helperText={error && 'Type some text'} color={"primary"} error={error}>

                </TextField>
                {/*<input className={inputClasses} value={title} onChange={changeInputValue} onKeyPress={onKeyHandler}/>*/}
                <IconButton onClick={addHandler} color={'primary'}>
                    <AddCircleOutlineIcon />
                </IconButton>
            </div>
            {/*<div className={s.errorMessage}>{error}</div>*/}
        </div>
    )
}

