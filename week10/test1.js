setImmediate(()=>{ console.log('imm');});
process.nextTick(()=>{console.log('nexTick');});

setTimeout(()=>{console.log('timeout');},0);

Promise.resolve().then(()=>{console.log('promise');});