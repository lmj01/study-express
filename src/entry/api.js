const express = require('express');
let tbUser = require('../sequelize/tb.user');
let logger = require('../middleware/logger');

let api = express();

api.post('/md', (req, res)=>{
    let body = req.body, name = body.name;
    let options = {
        root: __dirname + '/../../markdown/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-send': true
        }
    };
    res.sendFile(name, options);
});

api.post('/orm', (req, res)=>{ 
    let body = req.body, type = body.type;
    if (type) {
        if (type == 'create') {
            tbUser.create().then(result=>{
                logger.info('create', result);
            }).catch(err=>{
                logger.error('create', err);
            });
        } else if (type == 'add') {
            tbUser.add('test', '123', 'a@b.com').then(user=>{
                logger.info('add user', user);
            }).catch(err=>{
                logger.error('add user', err);
            });
        } else if (type == 'find') {
            tbUser.find('test').then(user=>{
                logger.info('find---', user);
            }).catch(err=>{
                logger.error('find ', err);
            });
        } else if (type == 'update') {
            tbUser.find('test').then(user=>{
                return user.update({
                    email: 'test@ss.com'
                }).then(res=>{
                    logger.info('update user ', res);
                }).catch(err=>{
                    logger.error('update err ', err);
                })
            }).catch(err=>{
                logger.error('update ', err);
            })
        } else if (type == 'remove') {
            tbUser.remove(1).then(user=>{
                logger.info('remove ', user);
            }).catch(err=>{
                logger.error('remove ', err);
            });
        }
    }
    res.send({ok:true});
});

module.exports = api;