let fs = require('fs');
let bundlejs = require('./bundle-js');
let bundlecss = require('./bundle-css');

function copy(src, dst) {
    fs.copyFile(src, dst, fs.constants.COPYFILE_EXCL, (err)=>{
        // if (err) {
        //     console.log(`copy file ${src} failure: ${err}`);
        // }
    });
}

function copyDeps() {
    let root = __dirname + "/../../";
    copy(root+'node_modules/three/build/three.min.js', root+'static/js/three.min.js');
    copy(root+'node_modules/vue/dist/vue.min.js', root+'static/js/vue.min.js');
}

copyDeps();

let cssOptions = {
    maxLineLen : 500,
    expandVars : true,
    uglyComments: false,
    cuteComments: false
}
let root = __dirname + "/../../";
bundlecss(root+'static/css/index.min.css', [
    root+'static/css-tmp/index.css'
], cssOptions);
bundlecss(root+'static/css/register.min.css', [
    root+'static/css-tmp/register.css'
], cssOptions);

let jsOptions = {
    // mangle: {
    //     toplevel: true
    // }
    compress: false,
    mangle: false
}
bundlejs(root+'static/js/register.min.js', [
    root+'src/frontend/http.js',
    root+'src/frontend/register.js'
], jsOptions);