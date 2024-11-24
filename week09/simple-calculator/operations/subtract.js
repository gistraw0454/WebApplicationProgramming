// subtract.js

// TODO: a - b를 반환하는 subtract 함수를 작성하고 export

function subtract(a, b){
    try {
        return a - b;
    }
    catch(error){
        throw error;
    }
}

module.exports = subtract;