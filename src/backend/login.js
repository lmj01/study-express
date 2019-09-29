let express = require('express');
let util = require('./util');

let router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('/login time: ', Date.now());
    next();
});

router.get('/', (req, res)=> {
    util.sendFile(res, '../../static/html', 'login.html');
});

router.post('/', (req, res)=>{
    res.send("hello, world!");
});

module.exports = router;