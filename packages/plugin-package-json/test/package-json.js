'use strict';

const {createTest} = require('@putout/test');
const packageJson = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['package-json', packageJson],
    ],
});

test('putout: plugin-package-json: remove-nyc: complex: report', (t) => {
    t.report('nyc', `Remove 'nyc' section of 'package.json', use file '.nycrc.json' instead`);
    t.end();
});

test('putout: plugin-package-json: remove-nyc: complex: transform', (t) => {
    t.transform('nyc');
    t.end();
});

test('putout: plugin-package-json: remove-nyc: add-type', (t) => {
    t.transform('add-type');
    t.end();
});

test('putout: plugin-package-json: remove-nyc: remove-commit-type', (t) => {
    t.transform('remove-commit-type');
    t.end();
});

test('plugin-package-json: no transform: find-file: disabled', (t) => {
    t.noTransform('find-file-disabled');
    t.end();
});
