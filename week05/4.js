const mySet = new Set();
mySet.add('myName');    //add로 요소 추가
mySet.add('myStudentId');
mySet.add('Apple');
mySet.add('myStudentId');   // 중복 무시
mySet.add('apple');
mySet.delete('myStudentId');
console.log(mySet.has('myStudentId')); // 결과는? 결과: false
console.log(Array.from(mySet)); // 결과는? 결과: [ 'myName', 'Apple', 'apple' ]