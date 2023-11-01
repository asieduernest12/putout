import {operator} from 'putout';

const {
    getProperties,
    setLiteralValue,
} = operator;
const parseName = (a) => a.value.replace('@putout/', '');

export const report = () => 'Set homepage';

export const traverse = ({push}) => ({
    '__putout_processor_json(__a)': (path) => {
        const __aPath = path.get('arguments.0');
        
        const {namePath, homepagePath} = getProperties(__aPath, ['name', 'homepage']);
        
        if (!namePath || !homepagePath)
            return;
        
        const name = namePath.node.value;
        const homepage = homepagePath.node.value;
        
        if (!name.value.startsWith('@putout'))
            return;
        
        if (name.value.includes('codemod'))
            return;
        
        if (name.value.includes('rule'))
            return;
        
        const dir = parseName(name);
        
        if (homepage.value.includes(dir))
            return;
        
        push({
            name,
            path: homepagePath,
            homepage,
        });
    },
});

export const fix = ({name, homepage}) => {
    const dir = parseName(name);
    
    setLiteralValue(homepage, `https://github.com/coderaiser/putout/tree/master/packages/${dir}`);
};
