let http = window.http || {};

http.get = function(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send(null);
}

http.post = function(url, args, cb, type) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.readyState, this.status);
            let result = 'response' in xhr ? xhr.response : xhr.responseText;
            try {                
                let res = JSON.parse(result);
                if (cb) cb(res);
            } catch(err) {
                console.log('not the json data');
                if (cb) cb(result);
            }
        } else {
            console.log(this.readyState, this.status);
        }
    };
    if (type == 'urlencode') {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');    
        xhr.send(args);
    }
    else if (type == 'formdata') {
        xhr.send(args);
    } else if (type == 'json') {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(args));
    } else if (type == 'blob') {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');    
        xhr.send(args);
    } else if (type == 'buffer') {
        xhr.setRequestHeader('Content-type', 'application/octet-stream');
        xhr.send(args);
    }
};
