import {TaskStateType} from "../AppWithReducers";
import {
    ActionAddTodolistType,
    ActionGetTodolistType,
    ActionRemoveTodolistType,
} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskAPI, TaskObjectType, TaskStatuses} from "../api/task-api";

//----------------------------------------------------------------------------------

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>;
export type TaskCheckboxActionType = ReturnType<typeof changeCheckboxAC>;
export type GetTasksActionType = ReturnType<typeof getTaskAC>;

type ActionType = ChangeTaskTitleActionType | AddTaskActionType | DeleteTaskActionType | TaskCheckboxActionType
    | ActionAddTodolistType | ActionRemoveTodolistType | ActionGetTodolistType | GetTasksActionType
//----------------------------------------------------------------------------------------------------

const initialState: TaskStateType = {
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
            return {...state, [action.TodolistID]: action.tasks}

        case "GET-TODOS":
            // debugger
            let copyTasks = {...state};
            action.todolist.forEach((tl) => {
                copyTasks[tl.id] = []
            });
            return copyTasks;

        case 'ADD-TASK':
            debugger
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}

        case 'DELETE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)}
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.task.todoListId]: state[action.task.todoListId].map(task => task.id === action.task.id ? {
                    ...task,
                    title: action.task.title
                } : task)
            }
        case 'CHANGE-CHECKBOX':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
                    ...task,
                    status: action.status
                } : task)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
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
export const getTaskAC = (TodolistID: string, tasks: Array<TaskObjectType>) => {
    return {type: 'GET-TASKS', TodolistID, tasks} as const
}
export const addTaskAC = (task: TaskObjectType) => {
    return {type: 'ADD-TASK', task} as const
}
export const deleteTaskAC = (taskID: string, todolistID: string) => {
    return {type: 'DELETE-TASK', taskID, todolistID} as const
}
export const changeTaskTitleAC = (task: TaskObjectType) => {
    return {type: 'CHANGE-TASK-TITLE', task} as const
}
export const changeCheckboxAC = (status: TaskStatuses, taskID: string, todolistID: string) => {
    return {type: 'CHANGE-CHECKBOX', status, taskID, todolistID} as const
}

//------------------------------------------------------------------------------------------
export const getTaskTC = (todolistID: string) => (dispatch: Dispatch) => {
    // debugger
    TaskAPI.getTsk(todolistID)
        .then((res) => {
            dispatch(getTaskAC(todolistID, res.data.items))
        })
}
export const deleteTaskTC = (taskID: string, todolistID: string) => (dispatch: Dispatch) => {
    TaskAPI.deleteTsk(taskID, todolistID)
        .then((res) => {
            dispatch(deleteTaskAC(taskID, todolistID))
        })
}
export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    TaskAPI.createTsk(todolistID, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTaskTC = (todolistID: string, taskID: string, title: string) => (dispatch: Dispatch) => {
    TaskAPI.updateTsk(todolistID, taskID, title)
        .then((res) => {
            dispatch(changeTaskTitleAC(res.data.data.item))
        })
}