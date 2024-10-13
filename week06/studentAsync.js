// 비동기 방식으로 다음의 과제를 각각 Callback, Promise, Async/Await 방식으로 구현합니다.

// 학생 데이터는 본인의 정보를 기준으로 수정합니다. 
// 학생 데이터의 string 출력은 모두 template string을 사용하여 출력해야 합니다.
// 1초 대기하는 함수를 제외한 모든 함수는 에러를 체크하는 구문이 있어야 합니다.
// 그 외 조건은 studentCallback, studentPromise와 같습니다.

//      예제 student.js 파일을 기반으로 한 출력은 다음과 같습니다.
//      제 이름은 홍길동이고, 20살입니다.
//      학번은 202412345이고, 2학년입니다.

// 3. Async/Await 방식 구현
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
async function asyncProcess() { //async쓰면 await가 비동기 코드를 호출할 수 있게 해주고, Promise객체가 반환됨
  // 전체 코드 작성
  try{
    await waitForSecondPromise();
    let data = await readDataFilePromise();
    let student = await createInstanceFromDataPromise(data);
    await printStudentDataPromise(student);

  }
  catch(err){
    console.log("에러발생",err);
  }
}

asyncProcess();