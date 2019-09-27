const fs = require('fs');
const multer = require('multer');
const config = require('./../../config/config');

let createFolder = (folder)=>{
    try {
        fs.accessSync(folder);
    } catch(e) {
        fs.mkdirSync(folder);
    }
}
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