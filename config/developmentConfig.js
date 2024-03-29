module.exports = {
    mysql: {
        host: 'localhost',
        user : 'root',
        password: 'lmjpassword',
        database: 'dbexpress',
        port: 3306,
        connectionLimit: 10
    }
    ,sessionSchema: {
        tableName: '',
        columnNames: {
            session_id: 'id',
            expires: 'expires',
            data: 'data'
        }
    }
    ,port: 8000
    ,storageFolder: 'uploadfiles/'
    ,formUploadDir: './static/images'
    ,limitSize: 52428800 // 50M limit
}