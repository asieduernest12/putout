import {
    test,
    stub,
} from 'supertape';
import {chooseFormatter} from './index.js';

const {stringify} = JSON;

const FORMATTER = 'progress-bar';

test('putout: cli: choose-formatter', async (t) => {
    const writeFile = stub();
    const dependencies = [
        'formatter-dump',
    ];
    
    const choose = stub().returns('dump');
    
    const result = await chooseFormatter(FORMATTER, dependencies, {
        writeFile,
        choose,
    });
    
    const expected = 'dump';
    
    t.equal(result, expected);
    t.end();
});

test('putout: cli: choose-formatter: getFormatters', async (t) => {
    const writeFile = stub();
    const dependencies = [
        '@putout/formatter-dump',
    ];
    
    const choose = stub().returns('dump');
    const autofocus = false;
    
    await chooseFormatter(FORMATTER, dependencies, {
        autofocus,
        writeFile,
        choose,
    });
    
    const expected = ['Choose formatter', ['dump'], {
        autofocus: false,
    }];
    
    t.calledWith(choose, expected);
    t.end();
});

test('putout: cli: choose-formatter: getFormatters: autofocus', async (t) => {
    const writeFile = stub();
    const dependencies = [
        '@putout/formatter-dump',
        '@putout/formatter-progress-bar',
    ];
    
    const readFile = stub().returns(stringify({
        formatter: ['progress-bar', {}],
    }));
    
    const choose = stub().returns('progress-bar');
    
    await chooseFormatter(FORMATTER, dependencies, {
        readFile,
        writeFile,
        choose,
    });
    
    const expected = ['Choose formatter', ['dump', 'progress-bar'], {
        autofocus: 1,
    }];
    
    t.calledWith(choose, expected);
    t.end();
});

test('putout: cli: choose-formatter: getFormatters: formatter', async (t) => {
    const dependencies = [
        '@putout/formatter-dump',
        '@putout/formatter-progress-bar',
    ];
    
    const writeFile = stub();
    const readFile = stub().returns(stringify({
        formatter: 'progress-bar',
    }));
    
    const choose = stub().returns('progress-bar');
    
    await chooseFormatter(FORMATTER, dependencies, {
        readFile,
        writeFile,
        choose,
    });
    
    const expected = ['Choose formatter', ['dump', 'progress-bar'], {
        autofocus: 1,
    }];
    
    t.calledWith(choose, expected);
    t.end();
});

test('putout: cli: choose-formatter: nothign chosen', async (t) => {
    const dependencies = [
        '@putout/formatter-dump',
        '@putout/formatter-progress-bar',
    ];
    
    const writeFile = stub();
    const readFile = stub().returns(stringify({
        formatter: 'progress-bar',
    }));
    
    const choose = stub();
    
    await chooseFormatter(FORMATTER, dependencies, {
        readFile,
        writeFile,
        choose,
    });
    
    t.notCalled(writeFile);
    t.end();
});

test('putout: cli: choose-formatter: nothign chosen: not found', async (t) => {
    const findUp = stub();
    const writeFile = stub();
    const dependencies = [
        '@putout/formatter-dump',
        '@putout/formatter-progress-bar',
    ];
    
    const readFile = stub().returns(stringify({
        formatter: 'progress-bar',
    }));
    
    const choose = stub().returns('dump');
    
    await chooseFormatter(FORMATTER, dependencies, {
        readFile,
        writeFile,
        findUp,
        choose,
    });
    
    t.notCalled(writeFile);
    t.end();
});