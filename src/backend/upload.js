const express = require('express');
const multiparty = require('multiparty');

let logger = require('../middleware/logger');
let router = express.Router();

router.use(function timeLog(req, res, next) {
    if (process.env.NODE_ENV == 'development') {
        console.log('/upload time: ', Date.now());
    }
    next();
});

router.get('/', (req, res)=> {
    let options = {
        root: __dirname + '/../../static',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-send': true
        }
    };
    res.setHeader('meta', 'UTF-8');
    res.sendFile("html/upload.html", options);
});

router.post('/formdata', (req, res)=>{
    let form = new multiparty.Form({
        uploadDir: './static/images'
    });
    form.parse(req, function(err, fields, files){
        logger.info(fields);
        logger.info(files);
        if (err) {
            logger.info(err);
        } 
        if (fields) {
            Object.keys(fields).forEach(function(name){
                logger.info('field name ' + name);
            });                
        }
        if (files) {
            Object.keys(files).forEach(function(name){
                logger.info('file name ' + name);
            });
        }
        //res.setHeader('text/plain');
        //res.end('file count' + files.length);
    });
    logger.info(req.body);
    let result = {ok:true};
    res.send(result);
})

module.exports = router;