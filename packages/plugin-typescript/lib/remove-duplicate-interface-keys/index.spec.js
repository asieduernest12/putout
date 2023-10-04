'use strict';

const {createTest} = require('@putout/test');
const removeDebugger = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['typescript: remove-duplicate-interface-keys', removeDebugger],
    ],
});

test('plugin-typescript: remove duplicate-interface-keys: report', (t) => {
    t.report('duplicate', `Avoid duplicate interface keys`);
    t.end();
});

test('plugin-typescript: remove duplicate-interface-keys: transform: duplicate', (t) => {
    t.transform('duplicate-literal');
    t.end();
});

test('plugin-typescript: remove duplicate-interface-keys: transform: break code with additional ";"', (t) => {
    t.transform('additional-semicolon');
    t.end();
});

test('plugin-typescript: remove duplicate-interface-keys: transform: alot', (t) => {
    t.transform('alot');
    t.end();
});

test('plugin-typescript: remove duplicate-interface-keys: no transform: index signature', (t) => {
    t.noTransform('index-signature');
    t.end();
});

test('plugin-typescript: remove duplicate-interface-keys: no transform: method', (t) => {
    t.noTransform('method');
    t.end();
});
