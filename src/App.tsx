import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
//-----------------------------------------------------------------------------------------
export type typeFilter='All'|'Active'|'Completed'

//-----------------------------------------------------------------------------------------
function App() {

    let [tasks2,setTasks2] = useState<Array<TaskType>>([
        { id: v1(), title: "Javascript", isDone: true },
        { id: v1(), title: "Node JS", isDone: false },
        { id: v1(), title: "React", isDone: true },
        { id: v1(), title: "HTML", isDone: false },
        { id: v1(), title: "CSS", isDone: false },
        { id: v1(), title: "Angular", isDone: true }
    ])
    let [filter, setFilter] = useState<typeFilter>('All')

    const changeCheckbox = (checkbox:boolean, id:string) => {
        // let task = tasks2.find(td => td.id === id)
        // if(task) {task.isDone = checkbox}
        // setTasks2([...tasks2])
        setTasks2(tasks2.map(td => td.id === id ? {...td, isDone:checkbox}  : td))
        //берем массив, ищем объект с нужным id, если находим - расчехляем объект и меняем значение isDone на пришедшее
        //checkbox, если id не совпадают, то объект не изменяем
    }
    const removeTask = (id:string) => {
        setTasks2(tasks2.filter(t => t.id !== id))
    }
    const addTask = (value:string) => {
        let newTask = { id: v1(), title: value, isDone: false }
        setTasks2([newTask,...tasks2])
    }
    let filteredTasks = tasks2
    if(filter === 'Active') {
        filteredTasks = tasks2.filter(f => !f.isDone)
    }
    if(filter === 'Completed') {
        filteredTasks = tasks2.filter(f => f.isDone)
    }
    const changeFilter = (filter:typeFilter) =>{
        setFilter(filter)
    }
    return (
        <div className="App">
            <Todolist
                title="Programs"
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask }
                changeCheckbox={changeCheckbox}
                filter={filter}
            />
        </div>
    );
}

export default App;
