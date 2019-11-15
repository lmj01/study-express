let fs = require('fs');
let bundlejs = require('./bundle-js');
let bundlecss = require('./bundle-css');
const createFolder = require('./folder');

function copy(src, dst) {
    fs.copyFile(src, dst, fs.constants.COPYFILE_EXCL, (err)=>{
        // if (err) {
        //     console.log(`copy file ${src} failure: ${err}`);
        // }
    });
}

function copyDeps() {
    let root = __dirname + "/../../";
    createFolder(root+'static/js');
    createFolder(root+'static/js/threejs');
    copy(root+'node_modules/three/build/three.min.js', root+'static/js/threejs/three.min.js');
    copy(root+'node_modules/three/build/three.module.js', root+'static/js/threejs/three.module.js');
    copy(root+'node_modules/three/examples/js/controls/OrbitControls.js', root+'static/js/threejs/OrbitControls.js');
    copy(root+'node_modules/three/examples/js/controls/OrthographicTrackballControls.js', root+'static/js/threejs/OrthographicTrackballControls.js');
    copy(root+'node_modules/vue/dist/vue.min.js', root+'static/js/vue.min.js');
    copy(root+"node_modules/showdown/dist/showdown.min.js", root+"static/js/showdown.min.js");
    copy(root+"node_modules/showdown/dist/showdown.min.js.map", root+"static/js/showdown.min.js.map");
    copy(root+"node_modules/ua-parser-js/dist/ua-parser.min.js", root+"static/js/us-parser.min.js");
}

copyDeps();

let cssOptions = {
    maxLineLen : 500,
    expandVars : true,
    uglyComments: false,
    cuteComments: false
}
let root = __dirname + "/../../";
createFolder(root+'static/css');
bundlecss(root+'static/css/index.min.css', [root+'static/css-tmp/index.css'], cssOptions);
bundlecss(root+'static/css/register.min.css', [root+'static/css-tmp/register.css'], cssOptions);
bundlecss(root+'static/css/upload.min.css', [root+'static/css-tmp/upload.css'], cssOptions);
bundlecss(root+'static/css/flex.row.min.css', [root+'static/css-tmp/flex.row.css'], cssOptions);

let jsOptions = {
    // mangle: {
    //     toplevel: true
    // }
    compress: false,
    mangle: false
}
bundlejs(root+'static/js/http.min.js', [root+'src/frontend/http.js'], jsOptions);
bundlejs(root+'static/js/netspeed.min.js', [root+'src/frontend/netspeed.js'], jsOptions);
bundlejs(root+'static/js/remlayout.min.js', [root+'src/frontend/remlayout.js'], jsOptions);
bundlejs(root+'static/js/meta.min.js', [root+'src/frontend/meta.js'], jsOptions);
bundlejs(root+'static/js/device.info.min.js', [root+'src/frontend/device.info.js'], jsOptions);
bundlejs(root+'static/js/register.min.js', [
    root+'src/frontend/http.js',
    root+'src/frontend/register.js'
], jsOptions);

