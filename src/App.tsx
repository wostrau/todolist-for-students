import React, {useState} from 'react';
import './App.css';
import Todolist from './Components/Todolist';
import {v4 as uuidv4} from 'uuid';

export type changeFilterPropsType = 'All' | 'Active' | 'Completed'
type todolistPropsType = {
    id: string
    title: string
    filter: changeFilterPropsType
}

function App() {
    const [tasks, setTask] = useState([
        {id: uuidv4(), title: 'HTML&CSS', isDone: true},
        {id: uuidv4(), title: 'JAVASCRIPT', isDone: true},
        {id: uuidv4(), title: 'REACT JS', isDone: false},
        {id: uuidv4(), title: 'ANGULAR', isDone: false},
    ]);
    const [todolists, setTodolists] = useState<Array<todolistPropsType>>([
        {id: uuidv4(), title: 'What to learn', filter: 'All'},
        {id: uuidv4(), title: 'What to buy', filter: 'All'},
    ]);

    function addTask(title: string) {
        let newTask = {
            id: uuidv4(),
            title: title,
            isDone: false
        }
        let newTasks = [newTask, ...tasks]
        setTask(newTasks)
    }

    function removeTask(id: string) {
        const filteredTask = tasks.filter((el) => el.id !== id)
        setTask(filteredTask)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(el => el.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTask([...tasks])
    }

    function changeFilter(value: changeFilterPropsType, todolistId: string) {
        let todolist = todolists.find(el => el.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    return (
        <div className='App'>
            {todolists.map((el) => {
                let filterTask = tasks
                if (el.filter === 'Active') {
                    filterTask = tasks.filter(el => !el.isDone)
                }
                if (el.filter === 'Completed') {
                    filterTask = tasks.filter(el => el.isDone)
                }
                return (
                    <Todolist
                        key={el.id}
                        id={el.id}
                        title={el.title}
                        taskList={filterTask}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                    />
                )
            })}
        </div>
    )
}

export default App;