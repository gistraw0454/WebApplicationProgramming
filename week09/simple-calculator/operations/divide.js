// divide.js

// TODO: a를 b로 나누는 divide 함수를 작성하고, 0으로 나눌 경우 에러를 발생시키기
// 에러의 메시지로 다음 메시지를 출력: Division by zero
function divide(a, b){
    if (b===0) {
        throw new Error("Division by zero");
    }
    else{
        return a/b;
    }
}
// export
module.exports = divide;
