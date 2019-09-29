const express = require('express');
let statistics = require('../model/statistics');

let admin = express();

admin.get('/', (req, res)=>{
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
    res.sendFile('html/admin/index.html', options);
});

module.exports = admin;