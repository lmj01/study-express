class Result {
    constructor() {
        // 0 表示正常，其他表示错误
        this.code = 0;
        // 错误信息
        this.message = '';
    }

    setCode(code) {
        this.code = code;
    }
    setMessage(message) {
        this.message = message;
    }
}

module.exports = Result;


