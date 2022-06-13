import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import '../App.css';

type taskPropsType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    taskList: Array<taskPropsType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}
type changeFilterPropsType = 'All' | 'Active' | 'Completed'

function Todolist(props: TodolistPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<null | string>(null);
    const [filterValue, setFilterValue] = useState<changeFilterPropsType>('All');
    const changeFilter = (value: changeFilterPropsType) => {
        setFilterValue(value)
    };
    let filterTask = props.taskList;
    if (filterValue === 'Active') {
        filterTask = props.taskList.filter(el => !el.isDone)
    }
    if (filterValue === 'Completed') {
        filterTask = props.taskList.filter(el => el.isDone)
    }
    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    };
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    };
    const addTasks = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    };
    const onAllClickHandler = () => changeFilter('All');
    const onActiveClickHandler = () => changeFilter('Active');
    const onCompletedClickHandler = () => changeFilter('Completed');

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyPressHandler}
                />
                <button onClick={addTasks}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {filterTask.map((el => {
                    const onRemoveHandler = () => {
                        props.removeTask(el.id)
                    }
                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, event.currentTarget.checked)
                    }
                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <button onClick={onRemoveHandler}>✖️</button>
                            <input
                                type="checkbox"
                                onChange={onChangeHandler}
                                checked={el.isDone}
                            />
                            <span>{el.title}</span>
                        </li>
                    )
                }))}
            </ul>
            <div>
                <button
                    className={filterValue === 'All' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}
                >All</button>
                <button
                    className={filterValue === 'Active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}
                >Active</button>
                <button
                    className={filterValue === 'Completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}
                >Completed</button>
            </div>
        </div>
    )
}

export default Todolist;