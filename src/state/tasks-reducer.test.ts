
import {TaskStateType} from "../AppWithReducers";
import {
    addTaskAC,
    changeCheckboxAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";


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
    const action = addTaskAC(taskTitle,TodolistID)
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
    const action = removeTaskAC(removedTaskID,TodolistID)
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

    const action = changeTaskTitleAC(changedTaskTitleID,newTaskTitle,TodolistID)
    const endState = tasksReducer(startState,action)


    expect(endState[TodolistID][2].title).toBe(newTaskTitle)
    expect(endState['TodolistID2'][2].title).toBe("Angular") // проверяем что таска с таким же id у второго тудулиста не изменилась

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

    const action = changeCheckboxAC(checkboxState,TaskID, TodolistID)
    const endState = tasksReducer(startState,action)

    expect(endState[TodolistID][0].isDone).toBe(false)
    // expect(endState[TodolistID][0].isDone).toBeFalsy()
    expect(endState['TodolistID2'][0].isDone).toBeTruthy()// проверяем что таска с таким же id у второго тудулиста не изменилась
    expect(endState[TodolistID].length).toBe(3)
})

test('add new task array, when new todolist created', ()=> {
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
    const newTodolistTitle = 'bla bla'
    const action = addTodolistAC(newTodolistTitle)
    const endState = tasksReducer(startState,action)
    const keys = Object.keys(endState)
    const newKey = keys.filter(k => k !=='TodolistID1' && k !=='TodolistID2')

    expect(keys.length).toBe(3)
    expect(endState[newKey[0]]).toStrictEqual([])
})

test('delete task array, when todolist removed', ()=> {
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
    const todolistId = 'TodolistID1'
    const action = removeTodolistAC(todolistId)
    const endState = tasksReducer(startState,action)
    const keys = Object.keys(endState)


    expect(endState[todolistId]).toBeUndefined()
    expect(keys.length).toBe(1)
})