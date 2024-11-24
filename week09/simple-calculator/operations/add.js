// add.js

// TODO: 두 숫자의 합을 1초 후 반환하는 비동기 함수를 작성하고 export

function add(a, b) {
    // 비동기 처리를 위한 코드를 작성
    // 조건: Promise와 setTimeout을 사용하여 1초 후에 합을 반환

    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{
            resolve(a+b);
        },1000);
    });
}

// export
module.exports = add;
