const fs = require('fs');
const createFolder = require('../util/folder');
const multer = require('multer');
const config = require('./../../config/config');

createFolder(config.storageFolder);
let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, config.storageFolder);
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname + '-' + Date.now());
    }
});

module.exports = storage;