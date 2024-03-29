import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskStatuses, TaskType} from '../../../../api/todolists-api'

export type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
};

export const Task = React.memo((props: TaskPropsType) => {

    const onClickRemoveHandler = useCallback(() => {
        props.removeTask(props.task.id, props.todolistId)
    }, [props.removeTask, props.task.id, props.todolistId]);

    const onChangeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        let isDoneValue = event.currentTarget.checked;
        props.changeTaskStatus(props.task.id, isDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.changeTaskStatus, props.task.id, props.todolistId]);

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId]);

    return (
        <div
            key={props.task.id}
            className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}
        >
            <Checkbox
                onChange={onChangeStatusHandler}
                checked={props.task.status === TaskStatuses.Completed}
            />
            <EditableSpan
                title={props.task.title}
                onChange={onChangeTitleHandler}
            />
            <IconButton
                aria-label="delete"
                onClick={onClickRemoveHandler}
            >
                <DeleteIcon/>
            </IconButton>
        </div>
    );
});