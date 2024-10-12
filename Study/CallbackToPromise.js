function findAndSaveUser(User){
    Users.findOne({},(err,user)=>{  //첫번째 콜백
        if (err){
            return console.log(err);
        }
        user.name = 'zero';
        user.save((err)=>{  //두번째 콜백
            if (err){
                return console.error(err);
            }
            Users.findOne({gender:'m'},(err,user)=>{    //세번째 콜백
                //생략
            });
        });
    });
}

//세번 중첩된 콜백을 프로미스로 바꿔보자 !
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
}   //함수내부에 Promise가 구현되어있다고 가정하고 보면됨.. (귀찮)

