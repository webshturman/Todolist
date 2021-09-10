import {TaskStateType} from "../App";
import {v1} from "uuid";
//----------------------------------------------------------------------------------

type ChangeTaskTitleActionType ={
    type: 'CHANGE-TASK-TITLE'
    id: string
    title:string
    TodolistID: string
}
type AddTaskActionType ={
    type: 'ADD-TASK'
    title:string
    TodolistID: string
}
type RemoveTaskActionType ={
    type: 'REMOVE-TASK'
    id: string
    TodolistID: string
}
type TaskCheckboxActionType = {
    type: 'CHANGE-CHECKBOX'
    checkbox:boolean
    id: string
    TodolistID: string
}

type ActionType = ChangeTaskTitleActionType | AddTaskActionType | RemoveTaskActionType | TaskCheckboxActionType
//----------------------------------------------------------------------------------------------------

export const tasksReducer = (state:TaskStateType, action:ActionType):TaskStateType => {
    switch(action.type){
        case 'ADD-TASK':
            return {...state, [action.TodolistID]:[{id:v1(), title:action.title, isDone:false}, ...state[action.TodolistID]]}
        case 'REMOVE-TASK':
            return {...state, [action.TodolistID]: state[action.TodolistID].filter(task => task.id !== action.id)}
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.TodolistID]: state[action.TodolistID].map(task => task.id === action.id ? {...task,title:action.title} : task)}
        case 'CHANGE-CHECKBOX':
            return {...state, [action.TodolistID]: state[action.TodolistID].map(task => task.id === action.id ? {...task,isDone:action.checkbox} : task)}
        default:
            return state
    }
}

//---------------------------------------------------------------------------------------------------------------------------------
export const AddTaskAC = (taskTitle:string, TodolistID:string):AddTaskActionType => {
    return {type:'ADD-TASK',title:taskTitle, TodolistID:TodolistID}
}
export const RemoveTaskAC = (removedTaskID:string, TodolistID:string):RemoveTaskActionType => {
    return {type:'REMOVE-TASK',id:removedTaskID, TodolistID:TodolistID}
}
export const ChangeTaskTitleAC = (changedTaskTitleID:string, newTaskTitle:string, TodolistID:string):ChangeTaskTitleActionType => {
    return {type:'CHANGE-TASK-TITLE',id:changedTaskTitleID, title:newTaskTitle, TodolistID:TodolistID}
}
export const ChangeCheckboxAC = (checkboxState:boolean, TaskID:string, TodolistID:string):TaskCheckboxActionType => {
    return {type:'CHANGE-CHECKBOX',id:TaskID, checkbox:checkboxState, TodolistID:TodolistID}
}