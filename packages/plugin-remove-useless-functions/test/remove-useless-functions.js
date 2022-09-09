'use strict';

const {createTest} = require('@putout/test');
const removeUselessFunctions = require('..');

const test = createTest(__dirname, {
    'remove-useless-functions': removeUselessFunctions,
});

test('remove usless functions: report', (t) => {
    t.report('block', 'Useless functions should be avoided');
    t.end();
});

test('remove usless functions: transform: block', (t) => {
    t.transform('block');
    t.end();
});

test('remove usless functions: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('remove usless functions: transform: async', (t) => {
    t.transform('async');
    t.end();
});

test('remove usless functions: transform: bool', (t) => {
    t.transform('bool');
    t.end();
});

test('remove usless functions: transform: id', (t) => {
    t.transform('id');
    t.end();
});

test('remove usless functions: no transform: method', (t) => {
    t.noTransform('method');
    t.end();
});

test('remove usless functions: no transform: method block', (t) => {
    t.noTransform('method-block');
    t.end();
});

test('remove usless functions: no transform: different args', (t) => {
    t.noTransform('different-args');
    t.end();
});

test('remove usless functions: transform: call', (t) => {
    t.transform('call');
    t.end();
});

