

import {TaskAPI, TaskPriorities, TaskStateType, TaskStatuses, UpdateTasksModelType} from "../api/task-api";
import { AppRootState, AppThunk} from "./store";
import {
     ActionTaskType, addTaskAC, ChangeLoadingStatusAC, deleteTaskAC,
    getTaskAC, updateTaskAC
} from "./actions";
import {handleNetworkError, handleServerError} from "../utils/error-utils";
import {ACTIONS_TYPE} from "../enums/actionsConstants";

//----------------------------------------------------------------------------------


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

export const tasksReducer = (state: TaskStateType = initialState, action: ActionTaskType): TaskStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.GET_TASKS_TYPE:
            return {...state, [action.TodolistID]: action.tasks}

        case ACTIONS_TYPE.GET_TODOLIST_TYPE:
            // debugger
            let copyTasks = {...state};
            action.todolist.forEach((tl) => {
                copyTasks[tl.id] = []
            });
            return copyTasks;

        case ACTIONS_TYPE.ADD_TASKS_TYPE:
            debugger
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}

        case ACTIONS_TYPE.DELETE_TASKS_TYPE:
            return {...state, [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)}

        case ACTIONS_TYPE.UPDATE_TASKS_TYPE:
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
                    ...task,
                    ...action.model
                } : task)
            }

        case ACTIONS_TYPE.ADD_TODOLIST_TYPE:
            return {...state, [action.todo.id]: []}
        case ACTIONS_TYPE.REMOVE_TODOLIST_TYPE:
            const newTasks = {...state}
            delete newTasks[action.todolistId]
            return newTasks
        case ACTIONS_TYPE.CLEAR_TODOS_DATA:
            return {}
        default:
            return state;
    }
}
//-----------------------------------------------------------------------------------------------------------------
export const getTaskTC = (todolistID: string): AppThunk => async dispatch => {
    dispatch(ChangeLoadingStatusAC('loading'))
    try {
        const res = await TaskAPI.getTsk(todolistID)
        dispatch(getTaskAC(todolistID, res.data.items))
        dispatch(ChangeLoadingStatusAC('succeeded'))
    } catch (e) {

    }
}
export const deleteTaskTC = (taskID: string, todolistID: string): AppThunk => async dispatch => {
    dispatch(ChangeLoadingStatusAC('loading'))
    try {
        const res = await TaskAPI.deleteTsk(taskID, todolistID)
        dispatch(deleteTaskAC(taskID, todolistID))
        dispatch(ChangeLoadingStatusAC('succeeded'))
    } catch (e) {

    }

}
export const addTaskTC = (todolistID: string, title: string): AppThunk => async dispatch => {
    dispatch(ChangeLoadingStatusAC('loading'))
    try {
        const res = await TaskAPI.createTsk(todolistID, title)
        if(res.data.resultCode === 0){
            dispatch(addTaskAC(res.data.data.item))
            dispatch(ChangeLoadingStatusAC('succeeded'))
        } else{
            handleServerError(res.data,dispatch)
        }

    } catch (error:any) {
        handleNetworkError(error,dispatch)
    }
}

export type UpdateDomainTasksModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistID: string, taskID: string, model: UpdateDomainTasksModelType): AppThunk => {
    return async (dispatch,
                  getState: () => AppRootState) => {
        dispatch(ChangeLoadingStatusAC('loading'))
        try {
            let allTasks = getState().tasks;
            let task = allTasks[todolistID].find(ts => ts.id === taskID)
            if (task) {
                let newModel: UpdateTasksModelType = {
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline,
                    ...model,
                }
                const res = await TaskAPI.updateTsk(todolistID, taskID, newModel)
                dispatch(updateTaskAC(todolistID, taskID, model))
                // dispatch(updateTaskAC(res.data.data.item))
                dispatch(ChangeLoadingStatusAC('succeeded'))
            }
        } catch (e) {

        }
    }

}