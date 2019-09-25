let express = require('express');
let router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('/login time: ', Date.now());
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
    res.sendFile("login.html", options);
});

router.post('/', (req, res)=>{
    res.send("hello, world!");
});

module.exports = router;