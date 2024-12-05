// callback 방식의 fs

// const fs = require('fs');
//
// fs.readFile('./readme.txt',(err,data)=>{
//     if(err){
//         throw err;
//     }else{
//         console.log(data);
//     }
// });

// promises 방식의 fs

const fs = require('fs').promises;

fs.readFile('./readme.txt')
    .then((data)=>{
        console.log(data.toString());
    })
    .catch((err)=>{
        console.error(err);
    });

fs.writeFile('./writeme.txt','입력된 내용')
    .then(()=>{
        return fs.readFile('./writeme.txt');
    })
    .then((data)=>{
        console.log(data.toString());
    })
    .catch((err)=>{
    console.error(err)
});