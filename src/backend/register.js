const express = require('express');
const multiparty = require('multiparty');
let util = require('./util');
const logger = require('../middleware/logger');
let config = require('../../config/config');
let router = express.Router();

router.use(function timeLog(req, res, next) {
    logger.info('register time ' + new Date());
    next();
});

router.get('/', (req, res)=> {
    let options = {
        root: __dirname + '/../../static/html',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-send': true
        }
    };
    res.sendFile("register.html", options);
});

router.post('/', (req, res)=>{
    let result = {};
    let form = new multiparty.Form({
        uploadDir: config.imgagesFolder
    });
    form.parse(req, function(err, fields, files) {
        if (err) {
            logger.error(err);
            result.ok = false;
            res.end(result);
            return;
        }
        logger.info(fields);
        logger.info(files);
    });
    if (req.get('Content-Type')=='application/json') {
        result = req.body;
    } else {
       logger.info(req.body);
        result = util.parserFormData(req.body);
    }
    logger.info(result);
    res.send(result);
});

module.exports = router;