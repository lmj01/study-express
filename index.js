const express = require("express");
const app = express();
const port = 8000;
let getMethods = require("./src/get-method");

let mysql = require('mysql');
let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'my_db'
});

connection.connect();

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

app.listen(port, ()=> console.log(`app listening on port ${port}!`));
