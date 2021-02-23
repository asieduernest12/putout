'use strict';

const {
    template,
    operator,
} = require('putout');

const {replaceWith} = operator;

const getProperty = require('../get-property');

const REPORT_SCRIPT = '"c8 report --reporter=lcov"';

module.exports.report = () => 'Report should use "lcov" instead of "text-lcov"';

module.exports.fix = ({path}) => {
    replaceWith(path, template.ast(REPORT_SCRIPT));
};

module.exports.traverse = ({push}) => {
    return {
        'export default __object'(path) {
            const rightPath = path.get('declaration');
            const reportPath = getProperty(rightPath, 'report');
            
            add(reportPath, {push});
        },
    };
};

function add(currentPath, {push}) {
    if (!currentPath)
        return;
    
    const bodyPath = currentPath.get('value.body');
    const line = bodyPath.toString();
    
    if (!line.includes('text-lcov'))
        return;
    
    push({
        path: bodyPath,
        line,
    });
}

