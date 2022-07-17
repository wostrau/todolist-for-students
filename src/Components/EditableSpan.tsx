import React, {ChangeEvent, useState} from 'react';
import '../App.css';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(props.title);

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    };
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    };
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    };

    return (
        editMode
            ? <TextField
                label=''
                variant='outlined'
                value={title}
                onChange={onChangeTitleHandler}
                onBlur={activateViewMode}
                autoFocus={true}
            />
            : <span
                onDoubleClick={activateEditMode}
            >{title}</span>
    );
}

export default EditableSpan;