import React from 'react';
import {ComponentMeta} from '@storybook/react';
import {Task} from './Task';
import {action} from '@storybook/addon-actions';
import {TaskPriorities, TaskStatuses} from '../../../../api/todolists-api';

export default {
    title: 'Task',
    component: Task
} as ComponentMeta<typeof Task>;

const removeTaskCallback = action('Task was removed')
const changeTaskStatusCallback = action('Task status was changed')
const changeTaskTitleCallback = action('Task title was changed')

export const TaskBaseExample = () => {
    return <>
        <Task
            task={{
                id: '1',
                todolistId: 'todolistId1',
                title: 'CSS',
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: ''
            }}
            todolistId={'todolistId1'}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
        />
        <Task
            task={{
                id: '1',
                todolistId: 'todolistId1',
                title: 'JS',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: ''
            }}
            todolistId={'todolistId2'}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
        />
    </>;
};