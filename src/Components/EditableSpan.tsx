import React from 'react';
import '../App.css';

type EditableSpanPropsType = {
    title: string
}

function EditableSpan(props: EditableSpanPropsType) {

    return (
        <span>{props.title}</span>
    );
}

export default EditableSpan;