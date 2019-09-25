let express = require('express');
let router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('/register time: ', Date.now());
    next();
});

router.get('/', (req, res)=> {
    console.log(req);
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
    console.log('register post',req);
    res.send(req.params);
});

module.exports = router;