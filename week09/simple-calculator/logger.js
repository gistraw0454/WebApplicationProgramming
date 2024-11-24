// logger.js

'use strict';

// TODO: 'this'를 사용하는 Logger 클래스 작성

class Logger {
    constructor() {
        // TODO: Logger 클래스의 prefix를 'Result: '로 설정
        this.prefix = 'Result: ';
    }

    log(message) {
        // TODO: prefix와 message를 사용하여 로그를 출력
        // message가 30일 때, 출력 로그: Result: 30
        console.log(`${this.prefix}${message}`);
    }

    error(message) {
        // TODO: 에러 메시지를 출력
        console.error(`Error: ${message}`);
    }
}

// TODO: Logger 클래스를 export
module.exports = Logger;
