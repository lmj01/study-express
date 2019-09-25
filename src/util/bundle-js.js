const fs = require('fs')
const uglifyjs = require('uglify-es');

function bundleJs(outFile, inFiles, options) {
    let data = {};
    for (let i=0; i<inFiles.length; ++i) {
        let val = fs.readFileSync(inFiles[i], 'utf-8');
        data['file'+(i+1)+'.js'] = val;
    }   
    let code = uglifyjs.minify(data, options); 
    if (code.code == undefined) {
        console.log(code);
    }
    fs.writeFileSync(outFile, code.code, 'utf-8');
}
module.exports = bundleJs;