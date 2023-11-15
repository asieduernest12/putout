'use strict';

const {operator, types} = require('putout');

const {ObjectProperty, StringLiteral} = types;

const {
    getProperties,
    insertAfter,
    __json,
} = operator;

module.exports.report = () => `Add 'type' of module to 'package.json'`;

module.exports.traverse = ({push}) => ({
    [__json]: (path) => {
        const __aPath = path.get('arguments.0');
        const {versionPath, typePath} = getProperties(__aPath, ['version', 'type']);
        
        if (typePath)
            return;
        
        if (!versionPath)
            return;
        
        push(versionPath);
    },
});

module.exports.fix = (path) => {
    const node = ObjectProperty(StringLiteral('type'), StringLiteral('commonjs'));
    insertAfter(path, node);
};
