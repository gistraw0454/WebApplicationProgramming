// 필요한 모듈 가져오기
const express = require('express');
const mysql = require('mysql2');


// MySQL 연결 풀을 생성 (7장 33쪽 참고)
const pool = mysql.createPool({host:'localhost', user:'root', password: '1234', database:'nodejs'});

// 연결 풀을 사용하여 promise 기반의 풀을 생성 (7장 33쪽 참고)
const promisePool = pool.promise();

// Express 라우터 객체 생성
const router = express.Router();

// '/' 경로에 대한 GET 요청 처리 ()
     // users 테이블에서 모든 데이터를 조회
         // users 변수에 조회된 데이터 저장
         // 'index' 템플릿에 데이터를 전달하여 렌더링
    
         // 에러 발생 시 다음 미들웨어로 에러 전달
         router.get('/', async (req, res, next) => {
            try {
                const [users] = await promisePool.query('SELECT * FROM users');
                // console.log(users);
                res.render('index', { users });
            } catch (error) {
                next(error);
            }
        });

 // 라우터 객체를 모듈로 내보냄
 module.exports = router;