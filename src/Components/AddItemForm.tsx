import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import '../App.css';
import {IconButton, TextField} from '@mui/material';
import {AddTask} from '@mui/icons-material';

type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
};

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<null | string>(null);

    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    };
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (event.key === 'Enter') {
            props.addItem(newTaskTitle);
            setNewTaskTitle('');
        }
    };
    const addItem = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required');
        }
    };

    return (
        <div>
            <TextField
                label="add title"
                variant="standard"
                error={!!error}
                helperText={error}
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyDown={onKeyPressHandler}
            />
            <IconButton
                onClick={addItem}
            >
                <AddTask/>
            </IconButton>
        </div>
    );
});