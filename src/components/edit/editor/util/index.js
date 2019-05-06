
export function assert(func) {
    if (!func())
        throw new Error(`assert failed func: ${func}`);
}