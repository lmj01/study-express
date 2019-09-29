
let mysql = require('mysql');
let logger = require('./logger');

class MySql {
    constructor() {
        this.pool = null; // 
        this.connect = null; // one-by-one         
        this.type = 0; // 1 connect, 2 pool
    }
    begin(options, type) {
        if (this.type != 0) {
            logger.error('mysql has connected');
            return;
        }
        if (type == 1) {
            this.connect = mysql.createConnection(options);
            this.connect.connect((err,res)=>{
                if (err) {
                    logger.info('mysql connect ... ', err);
                } else {
                    logger.info('mysql connect begin----', res);
                    this.type = 1;
                }
            });
        } else if (type == 2) {
            this.pool = mysql.createPool(options);
            logger.info('mysql pool begin----');
        }        
        this.type = type;
    }
    end() {
        if (this.type == 1) {
            this.connect.end(err=>{
                if (err) {
                    logger.error('mysql connection end ', err);
                } else {
                    logger.info('mysql connect end----');
                    this.type = 0;
                }
            });
        } else if (type == 2) {
            this.pool.end(err=>{
                if (err) {
                    logger.error('mysql connection end ', err);
                } else {
                    logger.info('mysql pool end----');
                    this.type = 0;
                }
            })
        } else {
            logger.error('mysql not connect, may pool or cluster');
        }
    }
    query(sql, cb) {
        if (this.type == 1) {
            this.connect.query(sql, function(err, rows, fields) {
                if (err) {
                    logger.error('query error: ', err);
                } else {
                    //logger.info(rows);
                    //logger.info(fields);
                    if (cb) cb(rows);
                }
            })
        } else if(this.type == 2) {
            this.pool.query(sql, function(err, rows, fields){
                if (err) {
                    logger.error('query error: ', err);
                } else {
                    //logger.info(rows);
                    //logger.info(fields);
                    if (cb) cb(rows);
                }
            })
        } else {
          logger.error('mysql not connect');  
        }
    }
    getConnection(cb) {
        if (this.type == 2) {
            this.pool.getConnection((err, conn)=>{
                if (err) {
                    logger.error('pool connect ', err);
                } else {
                    if (cb) cb(conn);
                }
            });
        }
    }
}

let sql = new MySql();

module.exports = sql;
