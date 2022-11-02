import React from 'react';
import {ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import App from './App';
import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';

export default {
    title: 'App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const changeCallback = action('Title has been changed')

export const AppBaseExample = () => {
    return <App/>
};