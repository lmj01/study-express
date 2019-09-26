const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
const expressWinston = require('express-winston');

let pathRegister = require('./src/backend/register');
let pathUpload = require('./src/backend/upload');
let pathLogin = require('./src/backend/login');
let config = require('./config/config');

const app = express();

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: false,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function(req, res) { 
        if (req.method == 'POST') {
            return false;
        }
        return true; 
    }
}));

app.use(bodyParser.raw({ type: 'application/vnd.custom-type'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text({ type: 'text/html' }));

let staticOption = {
    dotfiles: 'ignore',
    etag: false,
    extension: ['html', 'htm'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function(res, path, state) {
        res.set('x-timestamp', Date.now())
    }
}

// app.get('*', (req, res, next)=>{
//     let originList = [
//         'http://127.0.0.1'
//     ]
//     // if (originList.includes(req.headers.origin.toLowerCase())) {
//     //     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     // }
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'content-type');
//     res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
//     if (req.method.toLowerCase() == 'options') {
//         res.send(200);
//     } else {
//         next();    
//     }
// })

app.use(express.static('static', staticOption));
app.use('/register', pathRegister);
app.use('/upload', pathUpload);
app.use('/login', pathLogin);
app.get('/', (req, res)=>{
    let options = {
        root: __dirname + '/static/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-send': true
        }
    };
    res.sendFile('html/index.html', options);
});
app.get('*', (req, res)=>{
    res.end('404!');
})

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

app.listen(config.port, ()=> console.log(`app listening on port ${config.port}!`));
