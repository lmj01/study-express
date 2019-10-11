const Sequelize = require('sequelize');
const db = require('./db');
const logger = require('../middleware/logger');

let tbUser = db.define('tbUser', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true, 
        unique: true
    },
    userName: {
        type: Sequelize.STRING,
        field: 'user_name'
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type:Sequelize.STRING
    }
}, {
    freezeTableName: true // true即表名，false则自动使用复数形式，加s
});

function create() {
    // 返回一个promise对象
    // force为true表示先删除存在的再新建，默认为false，表示不删除
    return tbUser.sync({force: false});
}

function add(name, password, email) {
    return tbUser.create({
        userName: name,
        password: password,
        email: email
    })
}

function findByName(name) {
    return tbUser.findOne({
        where: {user_name:name}
    });
}

function remove(id) {
    return tbUser.destroy({
        where: {id:id}
    });
}

module.exports = {
    create: create,
    add: add,
    find: findByName,
    remove: remove
}