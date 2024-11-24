// calculator.js

// TODO: 모든 연산 모듈을 import
const add = require('./operations/add');
const divide = require('./operations/divide');
const multiply = require('./operations/multiply');
const subtract = require('./operations/subtract');

// TODO: 모든 연산 함수를 포함하는 객체 생성
const calculator = {
    add,
    divide,
    multiply,
    subtract,
};

// TODO: calculator 객체 export
module.exports = calculator;