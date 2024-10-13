// 비동기 방식으로 다음의 과제를 각각 Callback, Promise, Async/Await 방식으로 구현합니다.

// 학생 데이터는 본인의 정보를 기준으로 수정합니다. 
// 학생 데이터의 string 출력은 모두 template string을 사용하여 출력해야 합니다.
// 1초 대기하는 함수를 제외한 모든 함수는 에러를 체크하는 구문이 있어야 합니다.

// 전체 단계는 아래와 같습니다.

// 1. waitForSecond 함수를 사용하여 1초 대기
// 2. readDataFile 함수를 사용하여 파일 읽어오기 (Node.js의 fs 모듈 사용)
// 3. createInstanceFromData 함수를 사용하여 파일 내용을 바탕으로 Student instance를 생성하기
// 3-1. handleLowYear 함수를 사용하여 파일 내용 기반 추가 처리하기
//    2학년 이하인 경우, 출력되어야 합니다.
// 3-2. handleHighYear 함수를 사용하여 파일 내용 기반 추가 처리하기
//    3학년 이상인 경우, 출력되어야 합니다.
// 4. printStudentData 함수를 사용하여 학생 데이터 출력하기
//      예제 student.js 파일을 기반으로 한 출력은 다음과 같습니다.
//      제 이름은 홍길동이고, 20살입니다.
//      학번은 202412345이고, 2학년입니다.
// e. handleError 함수를 사용하여 에러 출력하기(단순히 에러가 발생했다고 콘솔에 출력하면 됩니다)

// 위 단계를 바탕으로, 모든 함수를 사용하여 학생 데이터를 출력하도록 하는 코드도 작성합니다.


// 1. Callback 방식 구현
const fs = require('fs');

class Student {
  constructor(name, age, studentId, year) {
    this.name = name;
    this.age = age;
    this.studentId = studentId;
    this.year = year;
  }
}

function waitForSecond(callback) {
  // 1초 대기
  setTimeout(()=>{
    callback();
  },1000);  //1초 후 콜백함수 실행
}

function readDataFile(callback) {
  fs.readFile('student.json', 'utf-8', (err, data) => {
    // 파일 읽기, 에러 처리
    if(err){
      return handleError(err);
    }
    callback(data);
  });
}

function createInstanceFromData(data, callback) {
  try {
    const parsedData = JSON.parse(data);  //json -> js 객체형태로 변환
    // Student instance 생성
    let student= new Student(parsedData.name,parsedData.age,parsedData.studentId,parsedData.year);
    // 조건문에 따라 저학년, 고학년 handling
    if (student.year<=2) handleLowYear(student,callback);
    else handleHighYear(student,callback);
  }
  catch(err){
    return handleError(err);
  }
    // 에러 처리
}

function handleLowYear(student, callback) {
  console.log('저는 저학년입니다.');
  // 처리 작성
  callback(student);
}

function handleHighYear(student, callback) {
  console.log('저는 고학년입니다.');
  // 처리 작성
  callback(student);
}

function printStudentData(student) {
  // 학생 데이터 출력
  const string1 = `제 이름은 ${student.name}이고, ${student.age}살입니다.`;
  const string2 = `학번은 ${student.studentId}이고, ${student.year}학년입니다.`;
  console.log(string1);
  console.log(string2);
}

function handleError(err) {
  // 에러 발생 시 출력
  console.log("에러 발생",err);
}

// 모든 함수를 사용하여 학생 데이터를 출력하도록 하는 코드
waitForSecond(()=>{
  readDataFile((data)=>{
    createInstanceFromData(data,(student)=>{
      printStudentData(student);
    });
  });
});