const express = require('express');
const multer = require('multer');
const logger = require('./logger');
let router = express.Router();

router.use(function timeLog(req, res, next) {
    if (process.env.NODE_ENV == 'development') {
        console.log('/upload time: ', Date.now());
    }
    next();
});

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploadfolder');
    },
    filename: function(req, file, cb) {
        cb(null, file.filename + '-' + Date.now());
    }
});
let upload = multer({ storage: storage });

router.get('/', (req, res)=> {
    let options = {
        root: __dirname + '/../../static/html',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-send': true
        }
    };
    res.sendFile("upload.html", options);
});

router.post('/', (req, res)=>{
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {

        } else if (err) {
            
        }
        logger.error(err);
    })
    let result = {};    
    logger.info(result);
    res.send(result);
});

module.exports = router;