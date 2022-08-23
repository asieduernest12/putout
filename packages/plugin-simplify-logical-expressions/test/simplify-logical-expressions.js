'use strict';

const {createTest} = require('@putout/test');
const simplifyLogicalExpression = require('..');

const test = createTest(__dirname, {
    'simplify-logical-expression': simplifyLogicalExpression,
});

test('plugin-simplify-logical-expression: report', (t) => {
    t.report('not', 'Simplify logical expression');
    t.end();
});

test('plugin-simplify-logical-expression: transform', (t) => {
    t.transform('not');
    t.end();
});

test('plugin-simplify-logical-expression: transform: wrong-not', (t) => {
    t.transform('wrong-not');
    t.end();
});

test('plugin-simplify-logical-expression: transform: instanceof', (t) => {
    t.transform('instanceof');
    t.end();
});

test('plugin-simplify-logical-expression: transform: in', (t) => {
    t.transform('in');
    t.end();
});

test('plugin-simplify-logical-expression: transform: same', (t) => {
    t.transform('same');
    t.end();
});

test('plugin-simplify-logical-expression: transform: duplicate', (t) => {
    t.transform('duplicate');
    t.end();
});

test('plugin-simplify-logical-expression: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-simplify-logical-expression: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-simplify-logical-expressions: transform: duplicates', (t) => {
    t.transform('duplicates');
    t.end();
});

