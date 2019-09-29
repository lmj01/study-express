const express = require('express');
const multiparty = require('multiparty');

let logger = require('../middleware/logger');
let config = require('../../config/config');
let router = express.Router();

router.use(function timeLog(req, res, next) {
    if (process.env.NODE_ENV == 'development') {
        console.log('/upload time: ', new Date());
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
    logger.info(req.get('Content-Type'));
    let form = new multiparty.Form({
        uploadDir: config.formUploadDir
    });
    form.parse(req, function(err, fields, files){
        if (err) {
            logger.error(err);
            res.end({ok:false});
            return;
        } 
        if (fields) {
            Object.keys(fields).forEach(function(name){
                logger.info('field name ' + name);
                logger.info(fields[name]);
            });                
        }
        if (files) {
            Object.keys(files).forEach(function(name){
                logger.info('file name ' + name);
                logger.info(files[name]);
            });
        }
    });
    res.send({ok:true});
});

router.post('/blob/json', (req, res)=>{
    logger.info('blob json data');
    logger.info(req.get('Content-Type'));
    logger.info(req.body);
    for (let k in req.body) {
        let val = k + req.body[k];
        let json = JSON.parse(val);
        logger.info(json);    
    }    
    let result = {ok:true};
    res.send(result);
});

router.post('/blob/buffer', (req, res)=>{
    logger.info('blob buffer data');
    logger.info(req.get('Content-Type'));
    logger.info(req.body);
    let result = {ok:true};
    res.send(result);
});

module.exports = router;