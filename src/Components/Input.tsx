import React, {ChangeEvent, KeyboardEvent} from 'react';

export type InputFormType ={
    addTask: (title:string) => void
    title:string
    setTitle: (title:string) => void
}


export const Input = (props:InputFormType) => {

    const changeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        props.setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler =(event:KeyboardEvent<HTMLInputElement>)=>{
        if(event.key==='Enter'){
            props.addTask(props.title)
            props.setTitle('')
        }
    }
   return(<input value={props.title} onChange={changeHandler} onKeyPress={onKeyPressHandler}/>)
}