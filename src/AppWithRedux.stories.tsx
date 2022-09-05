import React from 'react';
import {ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import AppWithRedux from './AppWithRedux';
import {Provider} from 'react-redux';
import {store} from './State/store';

export default {
    title: 'AppWithRedux',
    component: AppWithRedux
} as ComponentMeta<typeof AppWithRedux>;

const changeCallback = action('Title has been changed')

export const AppWithReduxBaseExample = () => {
    return <Provider store={store}>
        <AppWithRedux/>
    </Provider>
};