import {TaskStateType} from "../AppWithReducers";
import {v1} from "uuid";
import {
    ActionAddTodolistType,
    ActionGetTodolistType,
    ActionRemoveTodolistType,
} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskAPI, TaskObjectType} from "../api/task-api";

//----------------------------------------------------------------------------------

export type ChangeTaskTitleActionType= ReturnType<typeof changeTaskTitleAC>;
export type AddTaskActionType= ReturnType<typeof addTaskAC>;
export type RemoveTaskActionType= ReturnType<typeof removeTaskAC>;
export type TaskCheckboxActionType= ReturnType<typeof changeCheckboxAC>;
export type GetTasksActionType = ReturnType<typeof getTaskAC>;

type ActionType = ChangeTaskTitleActionType | AddTaskActionType | RemoveTaskActionType | TaskCheckboxActionType
    | ActionAddTodolistType | ActionRemoveTodolistType | ActionGetTodolistType | GetTasksActionType
//----------------------------------------------------------------------------------------------------

const initialState: TaskStateType  = {
    // [TodolistID1]: [
    //     {id: v1(), title: "Javascript", isDone: true},
    //     {id: v1(), title: "Node JS", isDone: false},
    //     {id: v1(), title: "React", isDone: true},
    // ],
    // [TodolistID2]: [
    //     {id: v1(), title: "HTML", isDone: false},
    //     {id: v1(), title: "CSS", isDone: false},
    //     {id: v1(), title: "Angular", isDone: true}
    // ]
}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "GET-TASKS":
            let copyTask = {...state}
            copyTask[action.TodolistID]=action.tasks
            return copyTask
        case "GET-TODOS":
            // debugger
            let copyTasks = {...state};
            action.todolist.forEach((tl)=> {
                copyTasks[tl.id]=[]
            });
            return copyTasks;
        case 'ADD-TASK':
            return {
                ...state,
                [action.TodolistID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.TodolistID]]
            }
        case 'REMOVE-TASK':
            return {...state, [action.TodolistID]: state[action.TodolistID].filter(task => task.id !== action.id)}
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.TodolistID]: state[action.TodolistID].map(task => task.id === action.id ? {
                    ...task,
                    title: action.title
                } : task)
            }
        case 'CHANGE-CHECKBOX':
            return {
                ...state,
                [action.TodolistID]: state[action.TodolistID].map(task => task.id === action.id ? {
                    ...task,
                    isDone: action.checkbox
                } : task)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]:[]
            }
        case 'REMOVE-TODOLIST':
            const newTasks = {...state}
            delete newTasks[action.id]
            return newTasks
        default:
            return state;
    }
}

//---------------------------------------------------------------------------------------------------------------------------------
export const getTaskAC = (TodolistID: string, tasks:Array<TaskObjectType>) => {
    return {type: 'GET-TASKS', TodolistID,tasks} as const
}
export const addTaskAC = (taskTitle: string, TodolistID: string) => {
    return {type: 'ADD-TASK', title: taskTitle, TodolistID: TodolistID} as const
}
export const removeTaskAC = (removedTaskID: string, TodolistID: string) => {
    return {type: 'REMOVE-TASK', id: removedTaskID, TodolistID: TodolistID} as const
}
export const changeTaskTitleAC = (changedTaskTitleID: string, newTaskTitle: string, TodolistID: string) => {
    return {type: 'CHANGE-TASK-TITLE', id: changedTaskTitleID, title: newTaskTitle, TodolistID: TodolistID} as const
}
export const changeCheckboxAC = (checkboxState: boolean, TaskID: string,  TodolistID: string)=> {
    return {type: 'CHANGE-CHECKBOX', checkbox: checkboxState, id: TaskID,  TodolistID: TodolistID} as const
}

//------------------------------------------------------------------------------------------
export const getTaskTC =(todolistID:string)=> {
    return (dispatch:Dispatch)=> {
        // debugger
        TaskAPI.getTsk(todolistID)
            .then((res)=>{
                dispatch(getTaskAC(todolistID, res.data.items))
            })
    }
}