'use strict';

const {operator} = require('putout');
const {
    remove,
    replaceWith,
} = operator;

module.exports.report = () => `Expand bindings`;

module.exports.fix = ({path, ref, parentPath}) => {
    const bindingInit = path.get('init');
    
    if (parentPath.isVariableDeclarator()) {
        const refInit = ref.parentPath.get('init');
        
        replaceWith(refInit, bindingInit);
        remove(path);
        
        return;
    }
    
    if (parentPath.isCallExpression()) {
        replaceWith(ref, bindingInit);
        remove(path);
        
        return;
    }
};

module.exports.traverse = ({push}) => ({
    ReferencedIdentifier(path) {
        const {name} = path.node;
        const binding = path.scope.bindings[name];
        
        if (!binding)
            return;
        
        if (binding.referencePaths.length !== 1)
            return;
        
        const [ref] = binding.referencePaths;
        const {parentPath} = ref;
        
        if (!binding.path.isVariableDeclarator())
            return;
        
        if (!binding.path.node.init)
            return;
        
        push({
            path: binding.path,
            parentPath,
            ref,
        });
    },
});
