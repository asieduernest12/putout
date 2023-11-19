'use strict';

const {createTest} = require('@putout/test');
const addPush = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['putout/add-push', addPush],
    ],
});

test('plugin-putout: add-push: report', (t) => {
    t.report('push', `Add 'push' argument to 'traverse'`);
    t.end();
});

test('plugin-putout: add-push: transform', (t) => {
    t.transform('push');
    t.end();
});

test('plugin-putout: add-push: transform: esm', (t) => {
    t.transform('esm');
    t.end();
});

test('plugin-putout: add-push: no report: exists', (t) => {
    t.noReport('exists');
    t.end();
});

test('plugin-putout: add-push: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('plugin-putout: add-push: transform: referenced', (t) => {
    t.transform('referenced');
    t.end();
});
