const express = require("express");
const app = express();
let getMethods = require("./src/get-method");
let config = require("./config/config");

let mysql = require('mysql');
let connection = mysql.createConnection({
    host:config.mysql.host,
    user:config.mysql.user,
    password:config.mysql.password,
    database: config.mysql.database
});

connection.connect((err, result)=>{
    if (err) {
        console.log('mysql connect ... ', err);
    } else {
        console.log('mysql connect ... ', result);
    }
});

connection.query('select 1 + 1 as solution', function(err, rows, fields){
    if (err) {
        console.log('query error: ', err);
        return;
    }
    console.log('the solution is : ', rows[0].solution);
});

connection.end();

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
app.use(getMethods);

app.listen(config.port, ()=> console.log(`app listening on port ${config.port}!`));
