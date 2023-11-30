'use strict';

const {test} = require('supertape');
const applyModuleTypeRules = require('./apply-module-type-rules');

test('putout: parse-options: apply module type rules: module', (t) => {
    const options = {};
    
    const info = {
        type: 'module',
    };
    
    applyModuleTypeRules(info, options);
    
    const expected = {
        match: {
            '*.js': {
                'nodejs/convert-commonjs-to-esm': 'on',
                'strict-mode/add-missing': 'off',
            },
            '.eslintrc.json': {
                'eslint': 'on',
                'eslint/convert-require-to-import': 'on',
            },
            '{test,*.spec.js}': {
                'tape/convert-mock-require-to-mock-import': 'on',
            },
        },
    };
    
    t.deepEqual(options, expected);
    t.end();
});

test('putout: parse-options: apply module type rules: commonjs', (t) => {
    const options = {};
    
    const info = {
        type: 'commonjs',
    };
    
    applyModuleTypeRules(info, options);
    
    const expected = {
        match: {
            '*.js': {
                'nodejs/convert-esm-to-commonjs': 'on',
            },
            '.eslintrc.json': {
                'eslint': 'on',
                'eslint/convert-require-to-import': 'off',
            },
        },
    };
    
    t.deepEqual(options, expected);
    t.end();
});

test('putout: parse-options: apply module type rules: no type', (t) => {
    const options = {};
    const info = {};
    
    applyModuleTypeRules(info, options);
    
    const expected = {
        match: {
            '*.js': {
                'nodejs/convert-esm-to-commonjs': 'on',
            },
            '.eslintrc.json': {
                'eslint': 'on',
                'eslint/convert-require-to-import': 'off',
            },
        },
    };
    
    t.deepEqual(options, expected);
    t.end();
});

test('putout: parse-options: apply module type rules: match exists', (t) => {
    const options = {
        match: {
            '*.js': {
                'remove-unused-variables': 'off',
            },
        },
    };
    
    const info = {};
    
    applyModuleTypeRules(info, options);
    
    const expected = {
        match: {
            '*.js': {
                'nodejs/convert-esm-to-commonjs': 'on',
                'remove-unused-variables': 'off',
            },
            '.eslintrc.json': {
                'eslint': 'on',
                'eslint/convert-require-to-import': 'off',
            },
        },
    };
    
    t.deepEqual(options, expected);
    t.end();
});
