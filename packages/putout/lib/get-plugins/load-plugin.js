'use strict';

const Module = require('module');
const tryCatch = require('try-catch');

const getModulePath = require('./get-module-path');
const cache = Object.create(null);

module.exports = ({name, load, namespace, pluginCache = true, fn}) => {
    if (!pluginCache)
        return requirePlugin({
            name,
            load,
            namespace,
            fn,
        });
    
    if (cache[name])
        return cache[name];
    
    cache[name] = requirePlugin({
        name,
        load,
        namespace,
        fn,
    });
    
    return cache[name];
};

function requirePlugin({name, load = require, namespace, fn}) {
    if (fn)
        return [
            name,
            fn,
        ];
    
    const [, npmPlugin] = tryCatch(load, getModulePath(`@${namespace}/plugin-${name}`));
    
    if (npmPlugin)
        return [
            name,
            npmPlugin,
        ];
    
    const [, userPlugin] = tryCatch(load, getModulePath(`${namespace}-plugin-${name}`));
    
    if (userPlugin)
        return [
            name,
            userPlugin,
        ];
    
    if (Module.plugins && Module.plugins[name])
        return [
            name,
            Module.plugins[name],
        ];
    
    throw Error(`Plugin "${namespace}-plugin-${name} could not be found!`);
}

