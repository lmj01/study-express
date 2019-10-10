const express = require('express');
let orm = require('../middleware/sequelize');

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

api.post('/orm', (req, res)=>{
    orm();
    res.send({ok:true});
});

module.exports = api;