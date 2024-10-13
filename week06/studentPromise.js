// 비동기 방식으로 다음의 과제를 각각 Callback, Promise, Async/Await 방식으로 구현합니다.

// 학생 데이터는 본인의 정보를 기준으로 수정합니다. 
// 학생 데이터의 string 출력은 모두 template string을 사용하여 출력해야 합니다.
// 1초 대기하는 함수를 제외한 모든 함수는 에러를 체크하는 구문이 있어야 합니다.

// 전체 단계는 아래와 같습니다.

// 1. waitForSecondPromise 함수를 사용하여 1초 대기
// 2. readDataFilePromise 함수를 사용하여 파일 읽어오기 (Node.js의 fs 모듈 사용)
// 3. createInstanceFromDataPromise 함수를 사용하여 파일 내용을 바탕으로 Student instance를 생성하기
// 3-1. handleLowYearPromise 함수를 사용하여 파일 내용 기반 추가 처리하기
//    2학년 이하인 경우, 출력되어야 합니다.
// 3-2. handleHighYearPromise 함수를 사용하여 파일 내용 기반 추가 처리하기
//    3학년 이상인 경우, 출력되어야 합니다.
// 4. printStudentDataPromise 함수를 사용하여 학생 데이터 출력하기
//      예제 student.js 파일을 기반으로 한 출력은 다음과 같습니다.
//      제 이름은 홍길동이고, 20살입니다.
//      학번은 202412345이고, 2학년입니다.

// 위 단계를 바탕으로, 모든 함수를 사용하여 학생 데이터를 출력하도록 하는 코드도 작성합니다.


// 2. Promise 방식 구현
const { rejects } = require('assert');
const fs = require('fs');

class Student {
  constructor(name, age, studentId, year) {
    this.name = name;
    this.age = age;
    this.studentId = studentId;
    this.year = year;
  }
}

function waitForSecondPromise() {
    // 1초 대기하는 promise 에러처리 x
    return new Promise ((resolve)=>{  //얘를 return하면 .then 이런거 쓸 수 있음.
      setTimeout(()=>{
        resolve();
      }, 1000);
    });
  }
  
  function readDataFilePromise() {
    // 파일 읽어오는 promise
    return fs.promises.readFile('student.json', 'utf-8')  //fs.promises.readFile 를써야함.
    .then((data)=>data)
    .catch((err)=>{
      throw err;
    });
  }
  
  function createInstanceFromDataPromise(data) {
   
    return new Promise((resolve,reject)=>{
      try{
        // json을 parse
        const parsedData = JSON.parse(data);
        let student= new Student(parsedData.name,parsedData.age,parsedData.studentId,parsedData.year);
        // 조건문에 따라 저학년, 고학년 handle하는 promise
        if(student.year<=2){
          handleLowYearPromise(student);
          resolve(student);
        }
        else{
          handleHighYearPromise(student);
          resolve(student);
        }

      }
      catch(err){
        reject(err);
      }
    })
    
  }
  
  function handleLowYearPromise(student) {
    // 저학년 처리 promise
    return new Promise((resolve)=>{
      console.log('저는 저학년입니다.');
      resolve();
    });
  }
  
  function handleHighYearPromise(student) {
    // 고학년 처리 promise
    return new Promise((resolve)=>{
      console.log('저는 고학년입니다.');
      resolve();
    });
  }
  
  function printStudentDataPromise(student) {
    // 학생 데이터 출력
    return new Promise((resolve)=>{
      const string1 = `제 이름은 ${student.name}이고, ${student.age}살입니다.`;
      const string2 = `학번은 ${student.studentId}이고, ${student.year}학년입니다.`;
      console.log(string1);
      console.log(string2);
      resolve();
    });
  }

// 모든 함수를 사용하여 학생 데이터를 출력하도록 하는 코드
waitForSecondPromise()
  .then(()=>readDataFilePromise())
  .then((data)=>createInstanceFromDataPromise(data))
  .then((student)=>printStudentDataPromise(student))
  .catch((err)=>{
    console.log("에러발생",err);
  })