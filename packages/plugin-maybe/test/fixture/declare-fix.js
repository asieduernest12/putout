const maybeFirst = (a) => isArray(a) ? a[0] : a;
const maybeFn = (a) => isFn(a) ? a : noop;
const maybeEmptyArray = (a) => !a ? [] : a;
const maybeArray = (a) => isArray(a) ? a : [a];
const a = maybeArray(x);
const b = maybeEmptyArray(y);
const c = maybeFn(z);
const d = maybeFirst(m);
