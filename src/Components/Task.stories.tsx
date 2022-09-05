import React from 'react';
import {ComponentMeta} from '@storybook/react';
import {Task} from './Task';
import {action} from '@storybook/addon-actions';

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
            task={{id: '1', title: 'CSS', isDone: true}}
            todolistId={'todolistId1'}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
        />
        <Task
            task={{id: '2', title: 'JS', isDone: false}}
            todolistId={'todolistId2'}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
        />
    </>;
};