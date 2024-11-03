const fs = require('fs').promises;
const fs2 = require('fs');
const readline = require('readline');

const userDataFile = 'users.json'; 

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/*
요구조건
  1. 사용자 정보는 다음과 같은 형식으로 저장된다.
    - 이름
    - 이메일 주소
    - user.json 파일로 저장
  2. 실행 시 '1. 사용자 정보 읽기' '2. 사용자 추가' 를 출력 후 '선택하려는 번호를 입력하세요 (또는 "q"를 입력하여 종료): ' 를 출력한다.
    - 이 때 1, 2, q가 아닌 다른 입력을 받을 시 '잘못된 선택입니다. 다시 선택해주세요.'를 출력한다.
  3. 1을 입력 시 '사용자 정보 읽기...'를 출력 후 사용자 목록을 출력한다.
    - 이 때 파일이 없거나 빈 파일일 경우 '사용자가 없습니다.'를 출력한다.
    - 아니라면 사용자 목록을 출력한다.
      - 형식: '(사용자 번호). (이름) ((메일주소))'
      ex) 3001. Nylon Musk (nylon@mars.go)
  4. 2를 입력 시 새 사용자를 입력받는다.
    순차적으로 '새 사용자의 이름을 입력하세요 : '를 출력 후 이름을 입력받고,
    '새 사용자의 이메일을 입력하세요: '를 출력 후 이메일을 입력받는다.
    - 정상적으로 추가되었다면, '새 사용자가 추가되었습니다.'를 출력한다.
    - 이 때 이름 또는 이메일 주소가 중복될 경우 '이름 : (입력한이름) 또는 이메일 : (입력한이메일) 이 중복됩니다.'를 Error로 출력하고 프로그램을 종료한다.
  5. q를 입력 시 '프로그램을 종료합니다.' 출력 후 프로그램을 종료한다.
*/


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function readUserData() {
  return fs.readFile(userDataFile, 'utf8')
      .then(data => JSON.parse(data))
      .catch(() => []);
}

function saveUserData(users) {
  return new Promise((resolve, reject) => {
    fs2.writeFile(userDataFile, JSON.stringify(users, null, 2), 'utf8', (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function addUser(user) {
  return readUserData()
      .then((users)=>{
        const isDuplicate = users.some(u => u.name === user.name || u.email === user.email);
        if (isDuplicate) {
          throw new Error(`이름 : ${user.name} 또는 이메일 : ${user.email} 이 중복됩니다.`);
        }
        users.push(user);
        return saveUserData(users);
      })
      .then(()=> {return delay(2000);})
      .then(()=>{
        console.log('새 사용자가 추가되었습니다.');
      })
      .catch((err)=>{
        // console.error(err.message);
        console.error(err);
        rl.close();
        process.exit(1);
      })

}

async function listUsers() {
  const users = await readUserData();
  if (users.length === 0) {
    console.log('사용자가 없습니다.');
  } else {
    console.log("사용자 목록:");
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email})`);
    });
  }
}

async function main() {
  while (true) {
    console.log('\n1. 사용자 정보 읽기');
    console.log('2. 사용자 추가');

    const choice = await new Promise((resolve) => {
      rl.question('선택하려는 번호를 입력하세요 (또는 "q"를 입력하여 종료): ', resolve);
    });

    if (choice === 'q') {
      console.log('프로그램을 종료합니다.');
      rl.close();
      break;
    } else if (choice === '1') {
      console.log('사용자 정보 읽기...');
      await listUsers();
    } else if (choice === '2') {
      const name = await new Promise((resolve) =>
          rl.question('새 사용자의 이름을 입력하세요: ', resolve)
      );
      const email = await new Promise((resolve) =>
          rl.question('새 사용자의 이메일을 입력하세요: ', resolve)
      );
      await delay(1000); // 1초 딜레이
      try {
        await addUser({name, email});
      } catch (err) {
        console.error(err.message);
        rl.close();
      }
    } else {
      console.log('잘못된 선택입니다. 다시 선택해주세요.');
    }
  }
}

main();
