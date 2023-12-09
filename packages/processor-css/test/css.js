import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    extension: 'css',
    processors: ['css'],
});

test('putout: processor: css', async ({process}) => {
    await process('style');
});

test('putout: processor: css: places', async ({comparePlaces}) => {
    await comparePlaces('style', [{
        message: 'Insert "····" (prettier/prettier)',
        position: {
            column: 1,
            line: 2,
        },
        rule: 'prettier/prettier (stylelint)',
    }]);
});

test('putout: processor: css: selector-class-pattern', async ({comparePlaces}) => {
    await comparePlaces('selector-class-pattern', []);
});

test('putout: processor: css: comparePlaces: url-quotes', async ({comparePlaces}) => {
    await comparePlaces('url-quotes', []);
});

test('putout: processor: css: template', async ({comparePlaces}) => {
    await comparePlaces('template', [{
        message: 'Unknown word (CssSyntaxError)',
        position: {
            column: 4,
            line: 1,
        },
        rule: 'CssSyntaxError (stylelint)',
    }]);
});

test('putout: processor: css: process: template', async ({process}) => {
    await process('template');
});
