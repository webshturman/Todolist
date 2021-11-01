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
export type DeleteTaskActionType= ReturnType<typeof deleteTaskAC>;
export type TaskCheckboxActionType= ReturnType<typeof changeCheckboxAC>;
export type GetTasksActionType = ReturnType<typeof getTaskAC>;

type ActionType = ChangeTaskTitleActionType | AddTaskActionType | DeleteTaskActionType | TaskCheckboxActionType
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
                [action.task.todoListId]: [{id: action.task.id, title: action.task.title, isDone: false}, ...state[action.task.todoListId]]
            }
        case 'DELETE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)}
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
export const addTaskAC = (task:TaskObjectType) => {
    return {type: 'ADD-TASK', task} as const
}
export const deleteTaskAC = (taskID:string, todolistID:string) => {
    return {type: 'DELETE-TASK', taskID, todolistID} as const
}
export const changeTaskTitleAC = (changedTaskTitleID: string, newTaskTitle: string, TodolistID: string) => {
    return {type: 'CHANGE-TASK-TITLE', id: changedTaskTitleID, title: newTaskTitle, TodolistID: TodolistID} as const
}
export const changeCheckboxAC = (checkboxState: boolean, TaskID: string,  TodolistID: string)=> {
    return {type: 'CHANGE-CHECKBOX', checkbox: checkboxState, id: TaskID,  TodolistID: TodolistID} as const
}

//------------------------------------------------------------------------------------------
export const getTaskTC =(todolistID:string)=> (dispatch:Dispatch)=> {
        // debugger
        TaskAPI.getTsk(todolistID)
            .then((res)=>{
                dispatch(getTaskAC(todolistID, res.data.items))
            })
    }
export const deleteTaskTC=(taskID:string, todolistID:string)=>(dispatch:Dispatch)=>{
        TaskAPI.deleteTsk(taskID, todolistID)
            .then((res)=>{
                dispatch(deleteTaskAC(taskID, todolistID))
            })
    }
export const addTaskTC=(todolistID:string,title:string)=>(dispatch:Dispatch)=>{
    debugger
    TaskAPI.createTsk(todolistID,title)
        .then((res)=>{

            dispatch(addTaskAC(res.data))
        })
}
// export const updateTaskTC=(todolistID:string,taskID:string,title:string)=>(dispatch:Dispatch)=>{
//
// }