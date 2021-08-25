import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
//-----------------------------------------------------------------------------------------
export type typeFilter = 'All' | 'Active' | 'Completed'
export type TodolistIdType = {
    [key: string]: Array<TaskType>
}
export type TodolistType = {
    id: string
    title: string
    filter: typeFilter
}

//-----------------------------------------------------------------------------------------
function App() {
    const TodolistID1 = '359f-1756'
    const TodolistID2 = '368d-1756'
    const [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: TodolistID1, title: 'What to learn', filter: 'All'},
        {id: TodolistID2, title: 'What to learn Extra', filter: 'All'}
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

    const changeCheckbox = (checkbox: boolean, id: string, TodolistID: string) => {
        setTasks({...tasks, [TodolistID]: tasks[TodolistID].map(td => td.id === id ? {...td, isDone: checkbox} : td)})
        //берем массив, ищем объект с нужным id, если находим - расчехляем объект и меняем значение isDone на пришедшее
        //checkbox, если id не совпадают, то объект не изменяем
    }
    const removeTask = (id: string, TodolistID: string) => {
        setTasks({...tasks, [TodolistID]: tasks[TodolistID].filter(t => t.id !== id)})
    }
    const addTask = (title: string, TodolistID: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [TodolistID]: [newTask, ...tasks[TodolistID]]})
    }
    const changeTodolist = (value: typeFilter, TodolistID: string) => {
        setTodolist(todolists.map(td => td.id === TodolistID ? {...td, filter: value} : td))
    }
    const removeTodolist = (TodolistID: string) => {
        setTodolist(todolists.filter(tl => tl.id !== TodolistID))
        const copyTasks = {...tasks}
        delete copyTasks[TodolistID] //вместе с тудулистом удаляем таски
        setTasks(copyTasks)
    }
    const addTodoList = (title: string) =>{
        let todolist:TodolistType = {id:v1(), title:title, filter:'All'}
        setTodolist([todolist,...todolists])
        setTasks({...tasks, [todolist.id]:[]})
    }
    return (

        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todolists.map(t => {
                let filteredTasks = tasks[t.id]
                if (t.filter === 'Active') {
                    filteredTasks = tasks[t.id].filter(f => !f.isDone)
                }
                if (t.filter === 'Completed') {
                    filteredTasks = tasks[t.id].filter(f => f.isDone)
                }
                return (
                    <Todolist
                        key={t.id}
                        TodolistID={t.id}
                        title={t.title}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        changeTodolist={changeTodolist}
                        addTask={addTask}
                        changeCheckbox={changeCheckbox}
                        filter={t.filter}
                        removeTodolist={removeTodolist}
                    />)
            })}
        </div>
    );
}

export default App;
