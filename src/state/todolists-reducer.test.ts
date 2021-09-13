import {v1} from "uuid";
import {TodolistType, typeFilter} from "../AppWithReducers";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer} from "./todolists-reducer";

test('add new todolist', ()=> {
    const TodolistID1 = v1()
    const TodolistID2 = v1()
    const startTodolists: Array<TodolistType> =[
        {id: TodolistID1, title: 'What to learn', filter: 'All'},
        {id: TodolistID2, title: 'What to learn Extra', filter: 'All'}
    ]
    const newTodolistTitle = 'New Todolist'
    const action = addTodolistAC(newTodolistTitle)
    const endTodolist = todolistsReducer(startTodolists,action)

    expect(endTodolist.length).toBe(3)
    expect(endTodolist[0].title).toBe(newTodolistTitle)
    expect(endTodolist[0].filter).toBe('All')
})

test('remove todolist', ()=> {
    const TodolistID1 = v1()
    const TodolistID2 = v1()
    const startTodolists: Array<TodolistType> =[
        {id: TodolistID1, title: 'What to learn', filter: 'All'},
        {id: TodolistID2, title: 'What to learn Extra', filter: 'All'}
    ]

    const action = removeTodolistAC(TodolistID1)
    const endTodolist = todolistsReducer(startTodolists,action )

    expect(endTodolist.length).toBe(1)
    expect(endTodolist[0].id).toBe(TodolistID2)
})

test('change todolist title', ()=> {
    const TodolistID1 = v1()
    const TodolistID2 = v1()
    const startTodolists: Array<TodolistType> =[
        {id: TodolistID1, title: 'What to learn', filter: 'All'},
        {id: TodolistID2, title: 'What to learn Extra', filter: 'All'}
    ]
    const newTodolistTitle = 'New Todolist'
    const action = changeTodolistTitleAC(newTodolistTitle, TodolistID1)
    const endTodolist = todolistsReducer(startTodolists,action)

    expect(endTodolist[0].title).toBe(newTodolistTitle)
})

test('change todolist filter', ()=> {
    const TodolistID1 = v1()
    const TodolistID2 = v1()
    const startTodolists: Array<TodolistType> =[
        {id: TodolistID1, title: 'What to learn', filter: 'All'},
        {id: TodolistID2, title: 'What to learn Extra', filter: 'All'}
    ]
    const newTodolistFilter:typeFilter = 'Active'
    const action = changeTodolistFilterAC(newTodolistFilter, TodolistID1)
    const endTodolist = todolistsReducer(startTodolists,action)

    expect(endTodolist[0].filter).toBe(newTodolistFilter)
})

