import React, {useState} from 'react';
import {InputType} from "./Input";

export const Button = (props:InputType) => {
    const addHandler = () => {
        props.addTask(props.title)
        props.setTitle('')
    }
    return ( <button onClick={addHandler}>+</button>)
}