import React from 'react';
import {ComponentMeta} from '@storybook/react';
import {EditableSpan} from './EditableSpan';
import {action} from '@storybook/addon-actions';

export default {
    title: 'EditableSpan',
    component: EditableSpan
} as ComponentMeta<typeof EditableSpan>;

const changeCallback = action('Title has been changed')

export const EditableSpanBaseExample = () => {
    return <EditableSpan
        title={'Start title'}
        onChange={changeCallback}
    />;
};