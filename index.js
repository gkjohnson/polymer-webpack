const md5 = require('md5')

module.exports = function(source) {
    this.cacheable && this.cacheable()

    const guardDef = md5(source.trim().replace(/\w+/g, ''))
    const res = `
    (window || global).__scriptguards__ = (window || global).__scriptguards__ || {};
    const guardDef = '${guardDef}';
    if(!(guardDef in (window || global).__scriptguards__)) {
        window.__scriptguards__[guardDef] = true;
        ${source}
    }
    `
    return res
}