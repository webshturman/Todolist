import React from 'react';
import s from '../App.module.css'


type NewButtonPropsType = {
    callback: () => void
    title: string
    filter?:string
}

export const NewButton = (props:NewButtonPropsType) => {
    let classButton = props.filter === props.title ? s.activeFilter : ''
    return (
      <button className={classButton} onClick={props.callback}>{props.title}</button>
    )
}