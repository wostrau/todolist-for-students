import path from 'path';
import initStoryshots from '@storybook/addon-storyshots';
import {imageSnapshot} from '@storybook/addon-storyshots-puppeteer';

initStoryshots();

describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        await page.goto('http://localhost:6006/iframe.html?id=additemform--add-item-form-base-example&viewMode=story');
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });
});