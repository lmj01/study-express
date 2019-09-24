let sass = require('node-sass');
let fs = require('fs');

function render(inpath, outpath) {
    sass.render({
        file:inpath,
        includePaths: ['../static/scss'],
        outputStyle: 
            'compressed'
            //'compact'
            //'nested'
            //'expanded'
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
    render('static/scss/index.scss', 'static/css/index.css');
} catch(err) {
    console.log('node-sass parser css', err);
}