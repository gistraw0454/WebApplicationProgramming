const http = require('http');

http.createServer((req,res)=>{
    console.log('createServer 콜백 함수 호출');
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
    res.write('<h1>Hello World</h1>');
    res.end();
})
    .listen(8000,()=>{
        console.log('8000번 포트에서 서버 대기중');
    })