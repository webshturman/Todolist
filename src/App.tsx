import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
//-----------------------------------------------------------------------------------------
export type typeFilter = 'All' | 'Active' | 'Completed'
type TodolistIdType = {
    [key: string]: Array<TaskType>
}
type TodolistType = {
    id: string
    name: string
    filter: typeFilter
}

//-----------------------------------------------------------------------------------------
function App() {
    const TodolistID1 = '359f-1756'
    const TodolistID2 = '368d-1756'
    const [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: TodolistID1, name: 'What to learn', filter: 'All'},
        {id: TodolistID1, name: 'What to learn Extra', filter: 'All'}
    ])
    let [tasks, setTasks] = useState<TodolistIdType>({
            [TodolistID1]: [
                {id: v1(), title: "Javascript", isDone: true},
                {id: v1(), title: "Node JS", isDone: false},
                {id: v1(), title: "React", isDone: true},
            ],
            [TodolistID2]: [
                {id: v1(), title: "HTML", isDone: false},
                {id: v1(), title: "CSS", isDone: false},
                {id: v1(), title: "Angular", isDone: true}
            ]
        }
    )
    let [filter, setFilter] = useState<typeFilter>('All')

    const changeCheckbox = (checkbox: boolean, id: string, TodolistID: string) => {
        setTasks({...tasks, [TodolistID]: tasks[TodolistID].map(td => td.id === id ? {...td, isDone: checkbox} : td)})
        //берем массив, ищем объект с нужным id, если находим - расчехляем объект и меняем значение isDone на пришедшее
        //checkbox, если id не совпадают, то объект не изменяем
    }
    const removeTask = (id: string, TodolistID: string) => {
        setTasks({...tasks, [TodolistID]: tasks[TodolistID].filter(t => t.id !== id)})
    }
    const addTask = (value: string, TodolistID: string) => {
        let newTask = {id: v1(), title: value, isDone: false}
        setTasks({...tasks, [TodolistID]: [newTask, ...tasks[TodolistID]]})
    }
    let filteredTasks = tasks
    if (filter === 'Active') {
        filteredTasks = tasks.filter(f => !f.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter(f => f.isDone)
    }
    const changeFilter = (filter: typeFilter, TodolistID: string) => {
        setFilter(filter)
    }
    return (
        <div className="App">
            {todolist.map(t => {
                return (
                    <Todolist
                        title="Programs"
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeCheckbox={changeCheckbox}
                        filter={filter}
                    />)
            })}

        </div>
    );
}

export default App;
