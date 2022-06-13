import React, {useState} from 'react';
import './App.css';
import Todolist from './Components/Todolist';
import {v4 as uuidv4} from 'uuid';

function App() {
    const [tasks, setTask] = useState([
        {id: uuidv4(), title: 'HTML&CSS', isDone: true},
        {id: uuidv4(), title: 'JAVASCRIPT', isDone: true},
        {id: uuidv4(), title: 'REACT JS', isDone: false},
        {id: uuidv4(), title: 'ANGULAR', isDone: false}
    ]);

    function removeTask(id: string) {
        const filteredTask = tasks.filter((el) => el.id !== id)
        setTask(filteredTask)
    }

    function addTask(title: string) {
        let newTask = {
            id: uuidv4(),
            title: title,
            isDone: false
        }
        let newTasks = [newTask, ...tasks]
        setTask(newTasks)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(el => el.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTask([...tasks])
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                taskList={tasks}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeStatus}
            />
        </div>
    )
}

export default App;