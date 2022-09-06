describe('addItemForm', () => {
    it('base example, visually looks correct', async()=>{
       await page.goto('http://localhost:9009/iframe.html?path=/story/additemform-stories--add-item-form-base-example');
       const image = await page.screenshot();

       expect(image).toMatchImageSnapshot();
    });
});