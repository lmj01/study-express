const Sequelize = require('sequelize');
const {mysql} = require('../../config/config');

module.exports = new Sequelize(mysql.database, 
    mysql.user, mysql.password,{
        host: mysql.host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000  // 10秒后如果没有连接就释放
        }
    });