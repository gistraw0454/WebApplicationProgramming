// multiply.js

// TODO: 'this'를 사용하여 두 숫자를 곱한 결과에 multiplier를 곱하는 
//       multiply 함수를 작성하고 export

function multiply(a, b) {
    // this.multiplier를 결과에 곱하고,
    // this.multiplier가 정의되어 있지 않으면 기본값 1을 사용
    if (this.multiplier == null){
        this.multiplier=1;
    }
    return a*b*this.multiplier;
}

// export
module.exports = multiply;
