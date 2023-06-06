'use strict';

const {test, stub} = require('supertape');

const mockRequire = require('mock-require');

const {
    reRequire,
    stopAll,
} = mockRequire;
const {stringify} = JSON;

test('putout: cli: process-file: eslint', async (t) => {
    const eslint = stub().returns(['', []]);
    
    const source = 'log123("hello")';
    const fix = false;
    const name = 'example.js';
    const log = stub();
    const write = stub();
    
    mockRequire('@putout/eslint', eslint);
    
    const options = {
        dir: '.',
    };
    
    const processFile = reRequire('./process-file');
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    await fn({
        name: 'example.js',
        source,
        index: 0,
        length: 1,
        options,
    });
    
    stopAll();
    
    const expected = {
        code: source,
        fix,
        name,
    };
    
    t.calledWith(eslint, [expected], 'should call eslint');
    t.end();
});

test('putout: cli: process-file: ts from preProcessor', async (t) => {
    const eslint = stub().returns(['', []]);
    
    const source = 'const x: number = 3';
    const fix = false;
    const name = 'example.md{ts}';
    const log = stub();
    const write = stub();
    
    mockRequire('@putout/eslint', eslint);
    
    const options = {
        dir: '.',
    };
    
    const processFile = reRequire('./process-file');
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    await fn({
        name,
        source,
        index: 0,
        length: 1,
        options,
    });
    
    stopAll();
    
    const expected = {
        code: source,
        fix,
        name,
    };
    
    t.calledWith(eslint, [expected], 'should call eslint');
    t.end();
});

test('putout: cli: process-file: tsx from preProcessor', async (t) => {
    const source = 'const x: number = <hello></hello>;';
    const fix = false;
    const name = 'example.md{tsx}';
    const log = stub();
    const write = stub();
    
    const options = {
        dir: '.',
    };
    
    const processFile = reRequire('./process-file');
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    const {places} = await fn({
        name,
        source,
        index: 0,
        length: 1,
        options,
    });
    
    t.deepEqual(places, []);
    t.end();
});

test('putout: cli: process-file: options for inner data', async (t) => {
    const source = `__putout_processor_json(${stringify({
        rules: {
            'putout-config': true,
        },
    })})`;
    
    const fix = false;
    const name = 'example.md{json}';
    const log = stub();
    const write = stub();
    const eslint = stub().returns(['', []]);
    
    const options = {
        dir: '.',
        match: {
            '*.md{json}': {
                'putout-config': 'on',
            },
        },
        rules: {
            'putout-config': 'off',
        },
        plugins: [
            'putout-config',
        ],
    };
    
    mockRequire('@putout/eslint', eslint);
    
    const processFile = reRequire('./process-file');
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    const {places} = await fn({
        name,
        source,
        index: 0,
        length: 1,
        options,
    });
    
    stopAll();
    
    const expected = [{
        message: 'String should be used instead of Boolean',
        position: {
            column: 50,
            line: 2,
        },
        rule: 'putout-config/convert-boolean-to-string',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: cli: process-file: ruler', async (t) => {
    const source = `__putout_processor_json(${stringify({
        rules: {
            'putout-config': true,
        },
    })})`.replace(/"/g, `'`);
    
    const fix = false;
    const name = 'example.md{json}';
    const log = stub();
    const write = stub();
    
    const eslint = stub().returns(['', [{
        message: 'Missing semicolon.',
        position: {
            column: 58,
            line: 2,
        },
        rule: 'semi (eslint)',
    }]]);
    
    const options = {
        dir: '.',
        match: {
            '*.md{json}': {
                'putout-config': 'on',
            },
        },
        rules: {
            'putout-config': 'off',
        },
        plugins: [
            'putout-config',
        ],
    };
    
    mockRequire('@putout/eslint', eslint);
    
    const ruler = {
        enableAll: true,
    };
    
    const processFile = reRequire('./process-file');
    
    const fn = processFile({
        fix,
        log,
        write,
        ruler,
    });
    
    const {places} = await fn({
        name,
        source,
        index: 0,
        length: 1,
        options,
    });
    
    stopAll();
    
    const expected = [{
        message: 'String should be used instead of Boolean',
        position: {
            column: 50,
            line: 2,
        },
        rule: 'putout-config/convert-boolean-to-string',
    }, {
        message: 'Missing semicolon.',
        position: {
            column: 58,
            line: 3,
        },
        rule: 'semi (eslint)',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});
