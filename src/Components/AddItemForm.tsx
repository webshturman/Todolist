import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export type InputType = {
    addItem: (title: string) => void

}
export const AddItemForm: React.FC<InputType> = React.memo(({ addItem}) => {
    console.log('AddItemForm')
    let [title, setTitle] = useState('')
    let [error, setError] = useState(false)
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        let currentValue = e.currentTarget.value
        if (!currentValue.trim()) {
            setError(true)
            // setTitle('')
        } else {
            setTitle(currentValue)
            setError(false)
        }
    }
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title) {
            addItem(title)
            setTitle('')
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
    return (
        <div>
            <div>
                <TextField value={title} onChange={changeInputValue} size={'small'} label={'Title'}
                           onKeyPress={onKeyHandler} variant={'outlined'} style={{height:'20px'}}
                           helperText={error && 'Type some text'} color={"primary"} error={error}>
                </TextField>

                <IconButton onClick={addHandler} color={'primary'}>
                    <AddCircleOutlineIcon />
                </IconButton>
            </div>
        </div>
    )
})

