let util = {};
util.parserFormData = function(src) {
    let dst = {};
    for (obj in src) {
        let str= obj+'='+src[obj];
        let arr = str.split('\r\n');
        for (let i=0;(i+4)<arr.length;i+=4) {
            let k = arr[i+1].split('=')[1], v = arr[i+3];
            dst[k.substr(1, k.length-2)] = v;
        }
    }
    return dst;
}

module.exports = util;