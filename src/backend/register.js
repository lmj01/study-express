let express = require('express');
let util = require('./util');
const logger = require('../middleware/logger');
let router = express.Router();

router.use(function timeLog(req, res, next) {
    // if (process.env.NODE_ENV == 'development') {
    //     console.log('/register time: ', Date.now());
    // }
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', 'content-type');
    // res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
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
    if (req.get('Content-Type')=='application/json') {
        result = req.body;
    } else {
        result = util.parserFormData(req.body);
    }
    logger.info(result);
    res.send(result);
});

module.exports = router;