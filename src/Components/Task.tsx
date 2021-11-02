import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {EditableSpan} from "./EditableSpan";
import {changeCheckboxAC, changeTaskTitleAC, deleteTaskTC} from "../state/tasks-reducer";
import s from "../App.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {TaskType} from "../Todolist";

export type SingleTaskType ={
    TaskID:string
    TodolistID:string
}

export const Task: React.FC<SingleTaskType> = React.memo(({TaskID, TodolistID}) => {
    // console.log('Task Render')
    const dispatch = useDispatch()
    const task = useSelector<AppRootState, TaskType>(state => {
       return  state.tasks[TodolistID].filter((ts:TaskType) => ts.id === TaskID)[0]
    })
    const taskRemover = useCallback(()=> dispatch(deleteTaskTC(TaskID,TodolistID)), [])
    const checkHandler = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(changeCheckboxAC(e.currentTarget.checked, TaskID, TodolistID))
    }
    const changeTitle = (title:string) => dispatch(changeTaskTitleAC(TaskID, title, TodolistID))
    let inputChecked = task.isDone ? s.isDone : ''
    return (
        <>
            <li key={task.id} className={inputChecked}>
                <IconButton size={'small'} onClick={taskRemover}>
                    <Delete/>
                </IconButton>
                <Checkbox checked={task.isDone} onChange={checkHandler} size={'small'} color={'primary'}/>
                <EditableSpan name={task.title} changeTitle={changeTitle}/>
            </li>
        </>
    );
});

export default Task;