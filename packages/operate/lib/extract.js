'use strict';

const {types} = require('@putout/babel');
const {
    isLiteral,
    isIdentifier,
    isMemberExpression,
    isTemplateElement,
    isRegExpLiteral,
    isClassMethod,
    isTemplateLiteral,
    isJSXText,
    isJSXAttribute,
    isTSTypeReference,
} = types;

module.exports.extract = extract;

function extract(node) {
    node = node.node || node;
    
    if (isIdentifier(node))
        return node.name;
    
    if (isRegExpLiteral(node))
        return node.pattern;
    
    if (isTemplateLiteral(node))
        return extract(node.quasis[0]);
    
    if (isLiteral(node))
        return node.value;
    
    if (isTemplateElement(node))
        return node.value.raw;
    
    if (isMemberExpression(node))
        return `${extract(node.object)}.${extract(node.property)}`;
    
    if (isJSXText(node))
        return node.value;
    
    if (isJSXAttribute(node))
        return node.name.name;
    
    if (isClassMethod(node))
        return extract(node.key);
    
    if (isTSTypeReference(node))
        return extract(node.typeName);
    
    throw Error(`"operator.extract(node)" understands only Literals, Identifiers, TemplateLiteral, TemplateElement, RegExpLiteral, MemberExpression, JSXAttribute, JSXText and TSTypeReference🤷, found: ${node.type}`);
}
