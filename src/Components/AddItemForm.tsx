import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import '../App.css';

type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
};

function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<null | string>(null);

    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    };
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }
    };
    const addItem = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    };

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyDown={onKeyPressHandler}
            />
            <button onClick={addItem}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default AddItemForm;