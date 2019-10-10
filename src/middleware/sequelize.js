const Sequelize = require('sequelize');
let logger = require('./logger');
const {mysql} = require('../../config/config');
let orm = new Sequelize(mysql.database, 
    mysql.user, mysql.password, {
        host: mysql.host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });

class OrmMysql {
    constructor() {
    }    
    tbUser() {
        let user = orm.define('tbUser', {
            firstName: {
                type: Sequelize.STRING,
                filed: 'first_name'
            },
            lastName: {
                type: Sequelize.STRING
            }
        }, {
            freezeTableName: true
        })
        user.sync({force: true}).then(()=>{
            return user.create({
                firstName: 'John',
                lastName: 'Hancock'
            });
        });
    }
    tbDevice() {
        let device = orm.define('tbDevice', {
            width: {
                type: Sequelize.NUMBER
            },
            height: {
                type: Sequelize.NUMBER
            },
            orientation: {
                type: Sequelize.STRING
            }
        }, {
            freezeTableName: false
        });
        device.sync({force: true}).then(()=>{
            return device.create({
                width: 414,
                height:736,
                orientation: 'portrait-primary'
            })
        });
    }
}

// module.exports = function() {
//     let ormUser = orm.define('ormUser', {
//         firstName: {
//             type: Sequelize.STRING,
//             field: 'first_name'
//         },
//         lastName: {
//             type: Sequelize.STRING
//         }
//     }, {
//         freezeTableName: true
//     });
//     ormUser.sync({force: true}).then(function(){
//         logger.info('create user');
//         return ormUser.create({
//             firstName: 'John',
//             lastName: 'Hancock'
//         });
//     });    
// };
module.exports = new OrmMysql();