export const traverse = ({push}) => ({
    [RULES](path) {
        const {__object} = getTemplateValues(path, RULES);
        
        push({
            path,
            __object,
        });
    },
});
