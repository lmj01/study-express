const express = require('express');
const app = express();
let pathRegister = require('./src/backend/register');
let pathLogin = require('./src/backend/login');
let config = require('./config/config');

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

app.use(express.static('static', staticOption));
app.use('/register', pathRegister);
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
    res.sendFile("html/index.html", options);
});
app.get('*', (req, res)=>{
    res.end("404!");
})


app.listen(config.port, ()=> console.log(`app listening on port ${config.port}!`));
