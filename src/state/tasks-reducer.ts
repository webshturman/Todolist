import {TaskAPI} from "../api/task-api";
import {AppRootState} from "./store";

import {handleNetworkError, handleServerError} from "../utils/error-utils";
import {
    TaskObjectType,
    TaskPriorities,
    TaskStateType,
    TaskStatuses,
    UpdateTasksModelType
} from "../api/types/taskApiType";
import {ChangeLoadingStatusAC} from "./loader-reducer";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, clearTodosDataAC, getTodosAC, removeTodolistAC} from "./todolists-reducer";


const initialState: TaskStateType = {
    // 'TodolistID': [{}, {}, {}],
    // 'TodolistID': [{}, {}, {}, {}],
    // 'TodolistID': [{}, {}, {}],
    // 'TodolistID': [{}, {}, {}],

}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: { //создаем мини-редюсеры из action creators
        getTaskAC(state, action: PayloadAction<{TodolistID: string, tasks: Array<TaskObjectType>}>){
            state[action.payload.TodolistID] = action.payload.tasks
        },
        addTaskAC(state, action: PayloadAction<{task: TaskObjectType}>){
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        deleteTaskAC(state, action: PayloadAction<{taskID: string, todolistID: string}>){
            const task = state[action.payload.todolistID]
            const index = task.findIndex(item=>{
                return item.id === action.payload.taskID
            })
           if(index !== -1) task.splice(index, 1)
        },
        updateTaskAC(state, action: PayloadAction<{todolistID: string, taskID: string, model: UpdateDomainTasksModelType}>){
            const task = state[action.payload.todolistID]
            const index = task.findIndex(item=>{
                return item.id === action.payload.taskID
            })
            if(index !== -1){
                task[index] = {...task[index], ...action.payload.model}
            }
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(getTodosAC, (state, action)=>{
            action.payload.todolist.forEach((tl:any) => {
                state[tl.id] = []
            })
        });
        builder.addCase(addTodolistAC, (state, action)=>{
           state[action.payload.todo.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action)=>{
            delete state[action.payload.todolistId]
        });
        builder.addCase(clearTodosDataAC, ()=>{
            return {}
        });
    }
    // extraReducers: {
    //     [getTodosAC.type]: (state, action:PayloadAction<{ todolist: Array<TodolistType> }>) => {
    //         action.payload.todolist.forEach((tl:any) => {
    //            state[tl.id] = []
    //       });
    //         return state
    //     },
    //     [addTodolistAC.type]: (state, action:PayloadAction<{ todo: TodolistType }>) => {
    //         return {...state, [action.payload.todo.id]: []}
    //     },
    //     [removeTodolistAC.type]: (state, action:PayloadAction<{ todolistId: string }>) => {
    //         delete state[action.payload.todolistId]
    //         return state
    //     },
    //     [clearTodosDataAC.type]: () => {
    //         return {}
    //     },
    // }
})
export const tasksReducer = slice.reducer;
export const {getTaskAC,addTaskAC,
    deleteTaskAC, updateTaskAC} = slice.actions;



export const getTaskTC = (todolistID: string) => async (dispatch:Dispatch) => {
    dispatch(ChangeLoadingStatusAC({value:'loading'}))
    try {
        const res = await TaskAPI.getTsk(todolistID)
        dispatch(getTaskAC({TodolistID: todolistID, tasks: res.data.items}))
        dispatch(ChangeLoadingStatusAC({value:'succeeded'}))
    } catch (e) {

    }
}
export const deleteTaskTC = (taskID: string, todolistID: string) => async (dispatch:Dispatch) => {
    dispatch(ChangeLoadingStatusAC({value:'loading'}))
    try {
        await TaskAPI.deleteTsk(taskID, todolistID)
        dispatch(deleteTaskAC({taskID, todolistID}))
        dispatch(ChangeLoadingStatusAC({value:'succeeded'}))
    } catch (e) {

    }

}
export const addTaskTC = (todolistID: string, title: string) => async (dispatch:Dispatch) => {
    dispatch(ChangeLoadingStatusAC({value:'loading'}))
    try {
        const res = await TaskAPI.createTsk(todolistID, title)
        if(res.data.resultCode === 0){
            dispatch(addTaskAC({task:res.data.data.item}))
            dispatch(ChangeLoadingStatusAC({value:'succeeded'}))
        } else{
            handleServerError(res.data,dispatch)
        }

    } catch (error:any) {
        handleNetworkError(error,dispatch)
    }
}

export const updateTaskTC = (todolistID: string, taskID: string, model: UpdateDomainTasksModelType) => {
    return async (dispatch:Dispatch,
                  getState: () => AppRootState) => {
        dispatch(ChangeLoadingStatusAC({value:'loading'}))
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
                dispatch(updateTaskAC({todolistID, taskID, model}))
                // dispatch(updateTaskAC(res.data.data.item))
                dispatch(ChangeLoadingStatusAC({value:'succeeded'}))
            }
        } catch (e) {

        }
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
//--------------------------------------------------------------------
// export const tasksReducer = (state: TaskStateType = initialState, action: any): TaskStateType => {
//     switch (action.type) {
//         case ACTIONS_TYPE.GET_TASKS_TYPE:
//             return {...state, [action.TodolistID]: action.tasks}
//
//         case getTodosAC.type:
//             let copyTasks = {...state};
//             action.payload.todolist.forEach((tl:any) => {
//                 copyTasks[tl.id] = []
//             });
//             return copyTasks;
//
//         case ACTIONS_TYPE.ADD_TASKS_TYPE:
//             return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//
//         case ACTIONS_TYPE.DELETE_TASKS_TYPE:
//             return {...state, [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)}
//
//         case ACTIONS_TYPE.UPDATE_TASKS_TYPE:
//             return {
//                 ...state,
//                 [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
//                     ...task,
//                     ...action.model
//                 } : task)
//             }
//
//         case addTodolistAC.type:
//             return {...state, [action.payload.todo.id]: []}
//         case removeTodolistAC.name:
//             const newTasks = {...state}
//             delete newTasks[action.payload.todolistId]
//             return newTasks
//         case clearTodosDataAC.type:
//             return {}
//         default:
//             return state;
//     }
// }
