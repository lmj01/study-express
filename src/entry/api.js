const express = require('express');

let api = express();

api.post('/md', (req, res)=>{
    let options = {
        root: __dirname + '/../../markdown/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-send': true
        }
    };
    res.sendFile('markdown-syntax.md', options);
});

module.exports = api;