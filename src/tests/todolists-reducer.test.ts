import {v1} from "uuid";
import {todolistReducer, TodolistStateType, typeFilter} from "../state/todolists-reducer";
import {
    addTodolistAC, changeEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, getTodosAC,
    removeTodolistAC
} from "../state/actions/todolists-actions";


let startTodoLists: Array<TodolistStateType>=[]
let TodolistID1 = v1()
let TodolistID2 = v1()
beforeEach(()=> {
    TodolistID1 = v1()
    TodolistID2 = v1()
    startTodoLists = [
        {id: TodolistID1, title: 'What to learn', filter: 'All', entityStatus:'idle'},
        {id: TodolistID2, title: 'What to learn Extra', filter: 'All', entityStatus:'idle'}
    ]
})

test('add new todolist', ()=> {

    const newTodolist = {id: '1', title: 'What to To DO', filter: 'All'}
    const action = addTodolistAC(newTodolist)
    const endTodolist = todolistReducer(startTodoLists,action)

    expect(endTodolist.length).toBe(3)
    expect(endTodolist[0].filter).toBe('All')
})

test('remove todolist', ()=> {

    const action = removeTodolistAC(TodolistID1)
    const endTodolist = todolistReducer(startTodoLists,action )

    expect(endTodolist.length).toBe(1)
    expect(endTodolist[0].id).toBe(TodolistID2)
})

test('change todolist title', ()=> {

    const newTodolistTitle = 'New Todolist'
    const action = changeTodolistTitleAC(newTodolistTitle, TodolistID1)
    const endTodolist = todolistReducer(startTodoLists,action)

    expect(endTodolist[0].title).toBe(newTodolistTitle)
})

test('change todolist filter', ()=> {

    const newTodolistFilter:typeFilter = 'Active'
    const action = changeTodolistFilterAC(newTodolistFilter, TodolistID1)
    const endTodolist = todolistReducer(startTodoLists,action)

    expect(endTodolist[0].filter).toBe(newTodolistFilter)
})
test('get todoLists from api', ()=> {

    const action = getTodosAC(startTodoLists)
    const endTodolist = todolistReducer([],action)

    expect(endTodolist.length).toBe(2)
})

test('entityStatus status should be changed correct ', ()=> {

    const action = changeEntityStatusAC("loading",TodolistID1)
    const endState = todolistReducer(startTodoLists,action)

    expect(endState[0].entityStatus).toBe("loading")
    expect(endState[1].entityStatus).toBe("idle")
})
