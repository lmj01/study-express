let http = window.http || {};

http.post = function(url, args, cb) {
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.onload = e=>{
        if (req.status == 200) {
            try {
                let res = JSON.parse(req.response);
                if (cb) cb(res);
            } catch(err) {
                console.log('not the json data');
                if (cb) cb(req.response);
            }            
        } else {
            alert(req.statusText);
        }
    };
    req.send(args);
};
