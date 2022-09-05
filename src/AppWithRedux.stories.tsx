import React from 'react';
import {ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import AppWithRedux from './AppWithRedux';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';

export default {
    title: 'AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

const changeCallback = action('Title has been changed')

export const AppWithReduxBaseExample = () => {
    return <AppWithRedux/>
};