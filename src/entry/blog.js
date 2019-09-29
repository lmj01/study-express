const express = require('express');
let statistics = require('../model/statistics');

let blog = express();

blog.get('/', (req, res)=>{
    let options = {
        root: __dirname + '/../../static/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-send': true
        }
    };
    statistics.parseSession(req.session);
    statistics.parseCookie(req.cookies);
    res.sendFile('html/blog/index.html', options);
});

module.exports = blog;