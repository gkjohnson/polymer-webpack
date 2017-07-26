module.exports = {
    // TODO: How to handle Polymer? It imports in tons of
    // import dependencies. Can't just check for "window.Polymer"
    {
        test: /(child-element|parent-element)\.html$/i,
        processor: function(filepath, source) {
            const elname = filepath.match(/([^\\]*)$/)[0].replace('.html', '')

            return `
            if (!customElements.get('${elname}')) {
                ${source}
            }
            `
        }
    },
    {
        test: /webcomponents.*\.js$/i,
        processor: function(filepath, source) {
            return `
            if  (!window.WebComponents) {
                ${source}
            }
            `
        }
    }]
}