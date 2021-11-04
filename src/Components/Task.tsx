import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {EditableSpan} from "./EditableSpan";
import {changeCheckboxAC, deleteTaskTC, updateTaskTC} from "../state/tasks-reducer";
import s from "../App.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {TaskObjectType, TaskStatuses} from "../api/task-api";

export type SingleTaskType ={
    TaskID:string
    TodolistID:string
}

export const Task: React.FC<SingleTaskType> = React.memo(({TaskID, TodolistID}) => {
    // console.log('Task Render')
    const dispatch = useDispatch()
    const task = useSelector<AppRootState, TaskObjectType>(state => {
       return  state.tasks[TodolistID].filter((ts) => ts.id === TaskID)[0]
    })
    const taskRemover = useCallback(()=> dispatch(deleteTaskTC(TaskID,TodolistID)), [])
    const checkHandler = (e:ChangeEvent<HTMLInputElement>) => {
        let checkedData = e.currentTarget.checked;
        dispatch(changeCheckboxAC(checkedData ? TaskStatuses.Completed : TaskStatuses.New, TaskID, TodolistID))
    }
    const changeTitle = useCallback((title:string) => dispatch(updateTaskTC(TodolistID, TaskID, title)),[])
    let inputChecked = task.status === TaskStatuses.Completed ? s.isDone : ''
    return (
        <>
            <li key={task.id} className={inputChecked}>
                <IconButton size={'small'} onClick={taskRemover}>
                    <Delete/>
                </IconButton>
                <Checkbox checked={task.status===TaskStatuses.Completed} onChange={checkHandler} size={'small'} color={'primary'}/>
                <EditableSpan name={task.title} changeTitle={changeTitle}/>
            </li>
        </>
    );
});

export default Task;