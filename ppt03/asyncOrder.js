const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt',(err,data)=>{
    if(err){
        throw(err);
    }
    console.log('1',data.toString());
    fs.readFile('./readme2.txt',(err,data)=>{
        if(err){
            throw(err);
        }
        console.log('2',data.toString());
        fs.readFile('./readme2.txt',(err,data)=>{
            if(err){
                throw(err);
            }
            console.log('3',data.toString());
            console.log('끝');
        });
    });
});


