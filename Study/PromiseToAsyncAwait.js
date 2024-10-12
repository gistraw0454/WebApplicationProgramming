//CallbackToPromise.js
function findAndSaveUser(Users){
    Users.findOne({})
        .then((user)=>{
            user.name = 'zero';
            return user.save();
        })
        .then((user)=>{
            return Users.findOne({gender:'m'});
        })
        .then((user)=>{

        })
        .catch(err=>{
            console.error(err);
        });
}

//AsyncAwait 문법으로 바꿔보자 !!

async function findAndSaveUser2(Users){
    try {
        let user = await Users.findOne({});
        user.name = 'zero';
        user = await user.save();
        user = await Users.findOne({gender: 'm'});
        //생략
    }
    catch(error){   //프로미스 reject되는 경우 실행
        console.error(error);
    }
}

//이런것도 가능 : 화살표함수로 비동기로 가능
const findAndSaveUser3 = async (Users)=>{
    try{
        let user = await Users.findOne({});
        user.name = 'zero';
        user = await user.save();
        user = await Users.findOne({gender : 'm'});
        //생략
    }
    catch (error){
        console.error(error);
    }
};

//이런것도 가능 : for문과 async/await를 같이써서 순차적으로 프로미스 실행하기
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
(async() =>{
    for await(promise of [promise1,promise2]){
        console.log(promise);
    }
})();

async function fincAndSaveUser4(Users){
    
}
findAndSaveUser5().then(()=>{/*생략*/});
//or
async function other(){
    const result = await findAndSaveUser5();
}
//이런식으로 실행 후 then을 붙여 처리하거나, 또다른 async함수 안에서 await 붙여 처리 가능

// 중첩콜백 -> promise -> async/await 바꾸는 연습을 하자 !