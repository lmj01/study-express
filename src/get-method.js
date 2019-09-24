let express = require('express');
let router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', (req, res)=> {
    let options = {
        root: __dirname + '/../static/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-send': true
        }
    };
    res.sendFile("html/index.html", options, err=>{
        if (err) {
            //next(err);
            console.log('send failure', err);
        } else {
            console.log('send success');
        }
    })
});

module.exports = router;