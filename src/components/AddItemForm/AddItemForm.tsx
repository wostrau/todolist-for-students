import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import '../../app/App.css';
import {IconButton, TextField} from '@mui/material';
import {AddTask} from '@mui/icons-material';

type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
    disabled?: boolean
};

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {
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
            addItemHandler();
            setNewTaskTitle('');
        }
    };
    const addItemHandler = () => {
        if (newTaskTitle.trim() !== '') {
            addItem(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required');
        }
    };

    return (
        <div>
            <TextField
                disabled={disabled}
                label="add title"
                variant="standard"
                error={!!error}
                helperText={error}
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyDown={onKeyPressHandler}
            />
            <IconButton
                onClick={addItemHandler}
                disabled={disabled}
            >
                <AddTask/>
            </IconButton>
        </div>
    );
});