import {addTaskAC, deleteTaskAC, tasksReducer, updateTaskAC} from "../state/tasks-reducer";
import {
    addTodolistAC,
    clearTodosDataAC,
    getTodosAC,
    removeTodolistAC, todolistReducer,
    TodolistStateType
} from "../state/todolists-reducer";
import {TaskPriorities, TaskStateType, TaskStatuses} from "../api/types/taskApiType";

let startState:TaskStateType ={};
beforeEach(()=> {
    startState = {
        'TodolistID1': [
            { id: '1', description: '', title: 'Task1', status: TaskStatuses.New, priority:TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'TodolistID1', order: 0, addedDate: new Date},
            {id: '2', description: '', title: 'Task2', status: TaskStatuses.Completed, priority:TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'TodolistID1', order: 0, addedDate: new Date},
            {id: '3', description: '', title: 'Task3', status: TaskStatuses.New, priority:TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'TodolistID1', order: 0, addedDate: new Date},
        ],
        'TodolistID2': [
            { id: '444', description: '', title: '4Task4', status: TaskStatuses.New, priority:TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'TodolistID2', order: 0, addedDate: new Date},
            {id: '555', description: '', title: '5Task5', status: TaskStatuses.Completed, priority:TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'TodolistID2', order: 0, addedDate: new Date},
            {id: '666', description: '', title: '6Task6', status: TaskStatuses.New, priority:TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'TodolistID2', order: 0, addedDate: new Date},
        ]
    }
})

test('add new task', ()=> {

    const newTask = {id: '5', description: '', title: 'Task10', status: TaskStatuses.New, priority:TaskPriorities.Low,
        startDate: '', deadline: '', todoListId: 'TodolistID1', order: 0, addedDate: new Date}

    const action = addTaskAC({task:newTask})
    const endState = tasksReducer(startState,action)

    expect(endState['TodolistID1'].length).toBe(4)
    expect(endState['TodolistID1'][0].id).toBeDefined() //проверяем, что у новой таски сгенерировалась id
    expect(endState['TodolistID1'][0].id).toBe('5')
    expect(endState['TodolistID1'][0].title).toBe('Task10')
})

test('remove task', ()=> {

    const TodolistID = 'TodolistID1'
    const removedTaskID = '2'
    const action = deleteTaskAC({taskID:removedTaskID, todolistID:TodolistID})
    const endState = tasksReducer(startState,action)

    expect(endState[TodolistID].length).toBe(2)
    expect(endState['TodolistID2'].length).toBe(3)
    expect(endState[TodolistID].every(t => t.id !== '2')).toBeTruthy()
})

test('update task status and title', ()=> {
    const TodolistID = 'TodolistID1'
    const TaskID = '1'
    const action = updateTaskAC({todolistID:TodolistID,
        taskID:TaskID, model: {
            title: 'NEW TASK',
            description: '',
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',}})
    const endState = tasksReducer(startState,action)

    expect(endState[TodolistID][0].status).toBe(2)
    expect(endState[TodolistID][0].title).toBe('NEW TASK')
    // expect(endState[TodolistID][0].isDone).toBeFalsy()
    // expect(endState['TodolistID2'][0].isDone).toBeTruthy()
})

test('add new task array, when new todolist created', ()=> {

    const newTodolist = {id: '51', title: 'What to To DO', filter: 'All'}
    const action = addTodolistAC({todo:newTodolist})
    const endState = tasksReducer(startState,action)
    const keys = Object.keys(endState)
    const newKey = keys.filter(key => key !=='TodolistID1' && key !=='TodolistID2')

    expect(keys.length).toBe(3)
    expect(endState[newKey[0]]).toStrictEqual([])
})

test('delete task array, when todolist removed', ()=> {

    const todolistId = 'TodolistID1'
    const action = removeTodolistAC({todolistId})
    const endState = tasksReducer(startState,action)
    const keys = Object.keys(endState)


    expect(endState[todolistId]).toBeUndefined()
    expect(keys.length).toBe(1)
})

test('add new tasks, when get todoLists from server', ()=> {

    const startTodoLists: Array<TodolistStateType> = [
        {id: '20', title: 'What to learn', filter: 'All',entityStatus: 'idle'},
        {id: '11', title: 'What to learn Extra', filter: 'All',entityStatus: 'idle'}
    ];
    const action = getTodosAC({todolist:startTodoLists});
    const endState = tasksReducer({},action);
    const keys = Object.keys(endState);
    // const newKey = keys.filter(key => key !=='TodolistID1' && key !=='TodolistID2');

    expect(keys.length).toBe(2)
    expect(endState[keys[0]]).toStrictEqual([])
    expect(endState[keys[1]]).toStrictEqual([])
})
test('delete all tasks after logout ', ()=> {

    const action = clearTodosDataAC()
    const endState = tasksReducer(startState,action)

    expect(endState).toStrictEqual({})
})
// let keys=['20','11']
// let endState={
//     '20':[],
//     '11':[]
// }
