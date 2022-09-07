module.exports = {
    preset: 'jest-puppeteer-preset',
    testRegex: './*\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js']
};