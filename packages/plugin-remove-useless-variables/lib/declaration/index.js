'use strict';

const {operator} = require('putout');
const {remove, replaceWith} = operator;

module.exports.report = () => `Avoid useless declarations`;

module.exports.match = () => ({
    'return __a': ({__a}, path) => {
        const binding = path.scope.getAllBindings()[__a.name];
        
        if (!binding)
            return false;
        
        if (binding.referencePaths.length !== 1)
            return false;
        
        if (!binding.path.isVariableDeclarator())
            return false;
        
        if (binding.constantViolations.length)
            return false;
        
        if (!binding.path.get('id').isIdentifier())
            return false;
        
        if (!isTakesOneLine(binding))
            return false;
        
        const next = binding.path.parentPath.getNextSibling();
        const [ref] = binding.referencePaths;
        
        return next === ref.parentPath;
    },
});

module.exports.replace = () => ({
    'return __a': ({__a}, path) => {
        const binding = path.scope.getAllBindings()[__a.name];
        const [ref] = binding.referencePaths;
        
        replaceWith(ref, binding.path.node.init);
        remove(binding.path);
        
        return path;
    },
});

function isTakesOneLine(binding) {
    if (!binding.path.node.init)
        return false;
    
    const {start, end} = binding.path.node.init.loc;
    
    return start.line === end.line;
}
