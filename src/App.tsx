import React, {useState} from 'react';
import './App.css';
import Todolist, {taskPropsType} from './Components/Todolist';
import {v4 as uuid4} from 'uuid';
import AddItemForm from './Components/AddItemForm';

export type changeFilterPropsType = 'All' | 'Active' | 'Completed'
type todolistPropsType = {
    id: string
    title: string
    filter: changeFilterPropsType
}
type TaskStateType = {
    [key: string]: Array<taskPropsType>
}

function App() {
    const todolistId1 = uuid4();
    const todolistId2 = uuid4();
    const [todolists, setTodolist] = useState<Array<todolistPropsType>>([
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]);
    const [tasksObj, setTask] = useState<TaskStateType>({
        [todolistId1]: [
            {id: uuid4(), title: 'REACT JS', isDone: false},
            {id: uuid4(), title: 'TYPESCRIPT', isDone: false},
        ],
        [todolistId2]: [
            {id: uuid4(), title: 'MONITOR', isDone: false},
            {id: uuid4(), title: 'COMPUTER', isDone: true},
        ],
    });


    function addTask(title: string, todolistId: string) {
        let newTask = {id: uuid4(), title: title, isDone: false};
        const tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTask({...tasksObj});
    }
    function removeTask(id: string, todolistId: string) {
        const tasks = tasksObj[todolistId];
        const filteredTask = tasks.filter((el) => el.id !== id);
        tasksObj[todolistId] = filteredTask;
        setTask({...tasksObj});
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const tasks = tasksObj[todolistId];
        let task = tasks.find(el => el.id === taskId);
        if (task) {
            task.isDone = isDone
            setTask({...tasksObj})
        }

    }
    function changeFilter(value: changeFilterPropsType, todolistId: string) {
        let todolist = todolists.find((el: { id: string; }) => el.id === todolistId);
        if (todolist) {
            todolist.filter = value
            setTodolist([...todolists]);
        }
    }
    function removeTodolist(todolistId: string) {
        let filteredTodolist = todolists.filter(el => el.id !== todolistId);
        setTodolist(filteredTodolist);
        delete tasksObj[todolistId];
        setTask({...tasksObj});
    }
    function addTodolist(title: string) {
        const todolist: todolistPropsType = {
            id: uuid4(),
            filter: 'All',
            title: title
        };
        setTodolist([todolist, ...todolists])
        setTask({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm
                addItem={addTodolist}
            />
            {todolists.map((el) => {
                let filterTask = tasksObj[el.id];
                if (el.filter === 'Active') {
                    filterTask = filterTask.filter(el => !el.isDone)
                }
                if (el.filter === 'Completed') {
                    filterTask = filterTask.filter(el => el.isDone)
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
                        removeTodolist={removeTodolist}
                        filter={el.filter}
                    />
                );
            })}
        </div>
    );
}

export default App;