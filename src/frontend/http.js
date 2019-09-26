let http = window.http || {};

http.get = function(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send(null);
}

http.post = function(url, args, cb) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.readyState, this.status);
            try {
                let res = JSON.parse(xhr.response);
                if (cb) cb(res);
            } catch(err) {
                console.log('not the json data');
                if (cb) cb(xhr.response);
            }
        } else {
            console.log(this.readyState, this.status);
        }
    };
    // post必须设置，否则后台不能正常接收
    if (args instanceof FormData) {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');    
        xhr.send(args);
    } else {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(args));
    }        
};
