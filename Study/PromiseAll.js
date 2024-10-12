//프로미스 여러개 동시 처리
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');

Promise.all([promise1,promise2])    //result에는 배열이 들어있고, 하나라도 reject되면 catch로 이동
    .then((result)=>{
        console.log(result);
    })
    .catch((error)=>{
        console.error(error);
    });

//all대신 allSettled를 쓰면, 결괏값이 더 자세하게 나와 어떤 프로미스에서 reject되었는지 알 수 있음