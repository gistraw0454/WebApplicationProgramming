const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1',()=>{
    console.log('1');
});
myEvent.on('event2',()=>{
    console.log('2');
});
myEvent.on('event2',()=>{
    console.log('2');
});
myEvent.once('event3',()=>{
    console.log('3');
});


myEvent.emit('event1');
myEvent.emit('event2');
myEvent.emit('event3');
myEvent.emit('event3');

myEvent.on('event4',()=>{
    console.log('4');
});
myEvent.removeAllListeners('event4');
myEvent.emit('event4');

const listener = ()=>{
    console.log('5');
};
myEvent.on('event5',listener);
myEvent.removeListener('event5',listener);
myEvent.emit('event5'); //실행 X

console.log(myEvent.listenerCount('event2'));