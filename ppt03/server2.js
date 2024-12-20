const http = require('http');
const fs = require('fs').promises;  // why promises?

http.createServer(async (req,res)=>{
    try{
        const data = await fs.readFile('./server2.html');
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        res.end(data);
    }catch(err){
        console.error(err);
        res.writeHead(500,{'Content-Type':'text/html; charset=utf-8'});
        res.end(err.message);
    }
})
    .listen(8000,()=>{
        console.log('8000번 포트에서 대기중');
    })