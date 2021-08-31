import React from 'react';
import s from '../App.module.css'
import {Button} from "@material-ui/core";


type NewButtonPropsType = {
    callback: () => void
    title: string
    filter?:string
}

export const NewButton = (props:NewButtonPropsType) => {
    // let classButton = props.filter === props.title ? "secondary" : "primary"
    return (
      <Button  onClick={props.callback} variant={'contained'} size={'small'} color={props.filter === props.title ? "secondary" : "primary"}>{props.title}</Button>
    )
}