// main.mjs

// TODO: calculator 모듈 import
// TODO: Logger 모듈 import
const calculator = require('./calculator.js');
const Logger = require('./logger.js');

// TODO: Logger 인스턴스를 생성하기
const logger = new Logger();

const a = 10;
const b = 5;

try {
    // TODO: 비동기 add 함수를 호출하고 결과를 출력하기
    calculator.add(a, b).then(result => {
        logger.log(a+" + "+b+" = "+result);
    }).catch(error => {
        // 에러를 처리하고 로그 출력하기
        logger.error(error.message);
    });
} catch (error) {
    // TODO: 에러를 처리하고 로그 출력하기
    logger.error(error.message);

}

try {
    // TODO: subtract 함수를 호출하고 결과를 출력하기
    const result = calculator.subtract(a, b);
    logger.log(a+" - "+b+" = "+result);
} catch (error) {
    // TODO: 에러 처리하기
    logger.error(error.message);
}

try {
    // TODO: multiply 함수를 호출할 때 'this'를 설정하고 결과를 출력하기
    const context = { multiplier: 1 }; // 'this'를 위한 컨텍스트 객체 생성
    const result = calculator.multiply.call(context, a, b);
    logger.log(a+" * "+b+" = "+result);
} catch (error) {
    // TODO: 에러 처리하기
    logger.error(error.message);
}

try {
    // TODO: divide 함수를 호출하고 a를 0으로 나누기를 시도한 결과를 출력하기
    const result = calculator.divide(a, 0);
    logger.log(a+" / "+b+" = "+result);
} catch (error) {
    // TODO: 에러 처리하기
    logger.error(error.message);
}
