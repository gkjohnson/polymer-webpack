const md5 = require('md5')
const path = require('path')
const loaderUtils = require('loader-utils')

// Default guard approach that uses the source
// hash to guard against identical file rerun
function defaultGuard(filepath, source) {
    const guardDef = md5(source.trim().replace(/\w+/g, ''))

    return `
    (window || global).__scriptguards__ = (window || global).__scriptguards__ || {};
    const guardDef = '${guardDef}';
    if(!(guardDef in (window || global).__scriptguards__)) {
        (window || global).__scriptguards__[guardDef] = true;
        ${source}
    }
    `
}

// Returns the guarded source code using either the
// passing guard from the config or the default
// guard function
function getGuardedSource(filepath, source, config) {
    const filteredProcessor = config && config.guards && config.guards.filter(g => g.test.test(filepath))[0] || null
    const processor = filteredProcessor && filteredProcessor.processor || defaultGuard

    return processor(filepath, source)
}

module.exports = function(source) {
    this.cacheable && this.cacheable()

    const options = loaderUtils.getOptions(this)
    const config =  options && options.config && require(path.join(process.cwd(), options.config)) || null
    const relPath = path.relative(process.cwd(), this.resourcePath).replace(/\\/g, '\\\\')

    const res = getGuardedSource(this.resourcePath, source, config)
    return `
    // ${relPath}
    ${res}
    `
}