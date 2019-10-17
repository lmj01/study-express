let sass = require('node-sass');
let fs = require('fs');
const createFolder = require('./folder');

let root = __dirname + "/../../";

function render(inpath, outpath) {
    sass.render({
        file:inpath,
        includePaths: [root+'static/scss'],
        outputStyle: 
            //'compressed'
            //'compact'
            //'nested'
            'expanded'
    }, function(err, result) {
        if (err) {
            console.log('file: ', inpath);
            console.log('message: ', err.line, err.column, err.message);
        } else {
            fs.writeFile(outpath, result.css, e=>{
                let str = "success";
                if (e) {
                    str = "failure";
                }
                console.log(`${outpath}--->${str}`);
            })
        }
    });
}

try {
    createFolder(root+'static/css-tmp');
    render('static/scss/index.scss', 'static/css-tmp/index.css');
    render('static/scss/register.scss', 'static/css-tmp/register.css');
    render('static/scss/upload.scss', 'static/css-tmp/upload.css');
    render('static/scss/flex.row.scss', 'static/css-tmp/flex.row.css');
    render('static/scss/app/app.scss', 'static/css/app.min.css');
} catch(err) {
    console.log('node-sass parser css', err);
}