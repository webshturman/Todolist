import {tasksReducer} from "./tasks-reducer";
import {TaskStateType, TodolistType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer";

test('ids should be equal', ()=> {
    const newTasksObj: TaskStateType = {};
    const newTodolistArr:Array<TodolistType> = [];

    const action = addTodolistAC('New Todolist')
    const endStateTasks = tasksReducer(newTasksObj,action)
    const endStateTodolists = todolistsReducer(newTodolistArr,action)

    const tasksKeys = Object.keys(endStateTasks)
    expect(tasksKeys[0]).toBe(endStateTodolists[0].id)
    expect(endStateTodolists[0].id).toBe(action.todolistId)
})