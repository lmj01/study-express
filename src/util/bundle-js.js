const fs = require('fs')
const uglifyjs = require('uglify-js');

function bundleJs(outFile, inFiles, options) {
    let code = uglifyjs.minify(inFiles);    
    fs.writeFile(outFile, code, 'utf-8');
}
module.exports = bundleJs;