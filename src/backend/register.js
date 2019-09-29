const express = require('express');
const multiparty = require('multiparty');
const uuidv1 = require('uuid/v1');

let util = require('./util');
let result = require('../model/result');
let logger = require('../middleware/logger');
let mysql = require('../middleware/mysql');
let sql = require('../sql/loginuser');
let config = require('../../config/config');

let router = express.Router();

router.use(function timeLog(req, res, next) {
    logger.info('register time ' + new Date());
    next();
});

router.get('/', (req, res)=> {
    if (req.cookies.isVisit) {
        logger.info("has visited");
    } else {
        logger.info('first visited');
        res.cookie('isVisit', 1, {maxAge: 60 * 60 * 1000});    
    }
    mysql.query('select 1 + 1 as solution', rows=>{
        logger.info(rows[0].solution);
    });
    
    util.sendFile(res, '../../static/html', 'register.html');
});

router.post('/', (req, res)=>{
    if (req.get('Content-Type')=='application/json') {
        let ret = new result();
        ret.data = req.body;            
        ret.uuid = uuidv1();
        logger.info(ret);
        res.send(ret);
    } else {
        function handle(code, message) {
            let ret = new result();
            ret.setCode(code);
            ret.setMessage(message);
            res.send(ret);
        }
        new multiparty.Form({
            uploadDir: config.formUploadDir
        }).parse(req, (err, fields, files)=>{
            if (err) {
                logger.error(err);
                res.end({ok:false});
                return;
            } else {
                mysql.getConnection(conn=>{
                    let nickname = fields['nickname'];
                    conn.query(sql.queryByNickname, [nickname], (err1, res1)=>{
                        if (err1) {
                            logger.error('loginuser query nickname ', err1);
                        } else {
                            logger.info(res1);
                            if (res1.length > 0) {
                                handle(1, 'nickname is exists');
                            } else {
                                conn.query(sql.insert, [
                                    uuidv1(), nickname, fields['password'], fields['sex']
                                ], (err2, res2)=>{
                                    if (err2) {
                                        logger.error('loginuser insert ', err2);
                                    } else {
                                        handle(0, 'register success');
                                    }
                                })
                            }
                        }
                        conn.release();
                    });
                });
            }
        });        
    }
});

module.exports = router;