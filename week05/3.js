const myMap = new Map();
myMap.set('myName', '이유진'); // set (키, 값)으로 Map에 속성 추가
myMap.set('myStudentId', '202355570');
myMap.set('Apple', 'is not a banana');
myMap.delete('myStudentId');
console.log(myMap.size); // 결과는? 결과: 2
console.log(myMap.has('Apple'));    // 결과는? 결과: true