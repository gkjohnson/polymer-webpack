const path = require('path')

module.exports = function(source) {
    this.cacheable && this.cacheable()

    const guardDef = path.relative(process.cwd(), this.resourcePath).replace(/\\/g, '\\\\')
    const res = `
    window.__scriptguards__ = window.__scriptguards__ || {};
    const guardDef = '${guardDef}';
    if(!(guardDef in window.__scriptguards__)) {
        window.__scriptguards__[guardDef] = true;
        ${source}
    }
    `
    return res
}