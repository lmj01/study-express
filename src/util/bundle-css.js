const fs = require('fs');
const uglifycss = require('uglifycss');

function bundleCss(outFile, inFiles, options) {
    let uglifyCode = uglifycss.processFiles(inFiles, options);
    fs.writeFileSync(outFile, uglifyCode, 'utf-8');    
}

module.exports = bundleCss;