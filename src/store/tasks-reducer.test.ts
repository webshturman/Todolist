import {useState} from "react";
import {v1} from "uuid";
import {TaskStateType} from "../App";
import {AddTaskAC, ChangeCheckboxAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";

test('add new task', ()=> {
    let startState:TaskStateType = {
        'TodolistID1': [
            {id: '1', title: "Javascript", isDone: true},
            {id: '2', title: "Node JS", isDone: false},
            {id: '3', title: "React", isDone: true},
        ],
        'TodolistID2': [
            {id: '1', title: "HTML", isDone: false},
            {id: '2', title: "CSS", isDone: false},
            {id: '3', title: "Angular", isDone: true}
        ]
    }
    const TodolistID = 'TodolistID1'
    const taskTitle = 'newTask'
    const action = AddTaskAC(taskTitle,TodolistID)
    const endState = tasksReducer(startState,action)

    expect(endState[TodolistID].length).toBe(4)
    expect(endState[TodolistID][0].id).toBeDefined() //проверяем, что у новой таски сгенерировалась id
    expect(endState[TodolistID][0].title).toBe(taskTitle)
    expect(endState[TodolistID][0].isDone).toBe(false) //проверяем свойство isDone у новой таски
    expect(endState['TodolistID2'].length).toBe(3)
})

test('remove task', ()=> {
    let startState:TaskStateType = {
        'TodolistID1': [
            {id: '1', title: "Javascript", isDone: true},
            {id: '2', title: "Node JS", isDone: false},
            {id: '3', title: "React", isDone: true},
        ],
        'TodolistID2': [
            {id: '1', title: "HTML", isDone: false},
            {id: '2', title: "CSS", isDone: false},
            {id: '3', title: "Angular", isDone: true}
        ]
    }
    const TodolistID = 'TodolistID1'
    const removedTaskID = '2'
    const action = RemoveTaskAC(removedTaskID,TodolistID)
    const endState = tasksReducer(startState,action)

    expect(endState[TodolistID].length).toBe(2)
    expect(endState['TodolistID2'].length).toBe(3)
    expect(endState[TodolistID].every(t => t.id !== '2')).toBeTruthy()
})

test('change task title', ()=> {
    let startState:TaskStateType = {
        'TodolistID1': [
            {id: '1', title: "Javascript", isDone: true},
            {id: '2', title: "Node JS", isDone: false},
            {id: '3', title: "React", isDone: true},
        ],
        'TodolistID2': [
            {id: '1', title: "HTML", isDone: false},
            {id: '2', title: "CSS", isDone: false},
            {id: '3', title: "Angular", isDone: true}
        ]
    }
    const TodolistID = 'TodolistID1'
    const newTaskTitle = 'GitHub'
    const changedTaskTitleID = '3'

    const action = ChangeTaskTitleAC(changedTaskTitleID,newTaskTitle,TodolistID)
    const endState = tasksReducer(startState,action)


    expect(endState[TodolistID][2].title).toBe(newTaskTitle)
    expect(endState['TodolistID2'][2].title).toBe("Angular") // проверяем что таска стаким же id у второго тудулиста не изменилась

})

test('change task checkbox', ()=> {
    let startState:TaskStateType = {
        'TodolistID1': [
            {id: '1', title: "Javascript", isDone: true},
            {id: '2', title: "Node JS", isDone: false},
            {id: '3', title: "React", isDone: true},
        ],
        'TodolistID2': [
            {id: '1', title: "HTML", isDone: true},
            {id: '2', title: "CSS", isDone: false},
            {id: '3', title: "Angular", isDone: true}
        ]
    }
    const TodolistID = 'TodolistID1'
    const checkboxState = false
    const TaskID = '1'

    const action = ChangeCheckboxAC (checkboxState,TaskID, TodolistID)
    const endState = tasksReducer(startState,action)

    expect(endState[TodolistID][0].isDone).toBe(false)
    // expect(endState[TodolistID][0].isDone).toBeFalsy()
    expect(endState['TodolistID2'][0].isDone).toBeTruthy()// проверяем что таска стаким же id у второго тудулиста не изменилась
    expect(endState[TodolistID].length).toBe(3)
})