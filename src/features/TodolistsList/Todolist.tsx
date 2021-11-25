import React, {FC, useCallback, useEffect} from 'react';
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import Task from "./Task";
import {typeFilter} from "../../state/todolists-reducer";
import {RequestStatusType} from "../../state/loader-reducer";
import {AppRootState} from "../../state/store";
import {TaskObjectType, TaskStatuses} from "../../api/task-api";
import {addTaskTC, getTaskTC} from "../../state/tasks-reducer";
import {EditableSpan} from "../../Components/EditableSpan";
import {AddItemForm} from "../../Components/AddItemForm";
import {NewButton} from "../../Components/NewButton";



type PropsType = {
    title: string
    changeTodolist: (filter:typeFilter, TodolistID: string) =>void
    removeTodolist: (TodolistID:string) =>void
    changeTodolistTitle:(title:string, TodolistID: string)=>void
    filter:typeFilter
    TodolistID:string
    entityStatus:RequestStatusType
}
//-----------------------------------------------------------------------------------

export const Todolist: FC<PropsType> = React.memo(({title, changeTodolist, removeTodolist,
                                                       changeTodolistTitle, filter, TodolistID, entityStatus}) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TaskObjectType>>((state)=> state.tasks[TodolistID])
    //берем таски для конкретного тудулиста

    useEffect(()=>{
        dispatch(getTaskTC(TodolistID))
    },[])

//-----------------------------------------------------------------------------------------------------------------------
    const todolistRemover = useCallback(()=> removeTodolist(TodolistID),[removeTodolist, TodolistID])
    const changeTdlButton = useCallback((filter:typeFilter) => changeTodolist(filter, TodolistID), [changeTodolist,TodolistID])
    const newAddTask = useCallback((title:string)=> dispatch(addTaskTC(TodolistID,title)),[dispatch])
    const newTodolistTitle = useCallback((title:string)=> changeTodolistTitle(title, TodolistID),[changeTodolistTitle, TodolistID])

    let filteredTasks = tasks
    if (filter === 'Active') {
        filteredTasks = tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter(task => task.status === TaskStatuses.Completed)
    }
//-----------------------------------------------------------------------------------------------------------------
    return <div>
        <h3><EditableSpan name={title} changeTitle={newTodolistTitle}/>
            <IconButton size={'medium'}  onClick={todolistRemover} style={{padding:"5px",fontSize:"1rem"}}
            disabled={entityStatus==='loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm  addItem={newAddTask} entityStatus={entityStatus}/>

        <ul style={{listStyle:"none", padding:"0"}}>

            {filteredTasks.map((mTasks) => {
                return <Task key={mTasks.id} TaskID={mTasks.id} TodolistID={TodolistID}/>
            })}
        </ul>

        <div>
            <NewButton callback={useCallback(()=> changeTdlButton('All'),[changeTdlButton])} title={'All'} filter={filter}/>
            <NewButton callback={useCallback(()=> changeTdlButton('Active'),[changeTdlButton])} title={'Active'} filter={filter}/>
            <NewButton callback={useCallback(()=> changeTdlButton('Completed'),[changeTdlButton])} title={'Completed'} filter={filter}/>
        </div>
    </div>
})
