const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
const expressWinston = require('express-winston');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

let config = require('./config/config');
let pathRegister = require('./src/backend/register');
let pathUpload = require('./src/backend/upload');
let pathLogin = require('./src/backend/login');
let util = require('./src/backend/util');

let storage = require('./src/middleware/storage');
let logger = require('./src/middleware/logger');
let mysql = require('./src/middleware/mysql');

let statistics = require('./src/model/statistics');

let entryBlog = require('./src/entry/blog');
let entryAdmin = require('./src/entry/admin');

const app = express();

mysql.begin(config.mysql, 2);

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

app.use(bodyParser.raw({ 
    type: 'application/vnd.custom-type'
    ,limit: config.limitSize
}));
app.use(bodyParser.urlencoded({ 
    extended: false 
    ,limit: config.limitSize
}));
app.use(bodyParser.json({ 
    type: 'application/json'
    ,limit: config.limitSize 
}));
app.use(bodyParser.text({ 
    type: 'text/html' 
    ,limit: config.limitSize
}));
app.use(cookieParser());
app.use(expressSession({
    secret: 'recommand 128 byte randome string',
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1 * 60 * 60 * 1000 // 默认1小时
    }
}));

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

let uploadFile = multer({
    //dest: 'upload-single/'
    storage: storage
});

// 单文件上传
app.post('/uploadfile', uploadFile.single('logo'), (req, res, next)=>{
    let file = req.file;
    logger.info("single file", file);
    res.set({
        'content-type':'application/json;charset=utf-8'
    });
    res.send(JSON.stringify(file));
});
// 多文件上传
app.post('/uploadfiles', uploadFile.array('logos',2), (req, res, next)=>{
    let finfos = [];
    for (let i in req.files) {
        let file = req.files[i];
        let finfo = {};

        finfo.mimetype = file.mimetype;
        finfo.originalname = file.originalname;
        finfo.size = file.size;
        finfo.path = file.path;
        
        finfos.push(finfo);
    }
    logger.info("2 file", finfos);
    res.set({
        'content-type':'application/json;charset=utf-8'
    });
    res.send(JSON.stringify(finfos));
});

app.use(express.static('static', staticOption));
app.use('/blog', entryBlog);
app.use('/admin', entryAdmin);

app.use('/register', pathRegister);
app.use('/upload', pathUpload);
app.use('/login', pathLogin);
app.get('/', (req, res)=>{
    statistics.parseSession(req.session);
    statistics.parseCookie(req.cookies);
    util.sendFile(res, '../../static/html', 'index.html');
});

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
