// 필요한 모듈 가져오기
const express = require('express');
const mysql = require('mysql2');

// MySQL 연결 풀을 생성 (7장 33쪽 참고)
const pool = mysql.createPool({host:'localhost', user:'root', password: '1234', database:'nodejs'});

// 연결 풀을 사용하여 promise 기반의 풀을 생성 (7장 33쪽 참고)
const promisePool = pool.promise();

// Express 라우터 객체 생성 (6장 29쪽 참고)
const router = express.Router();

// '/' 경로에 대한 GET 요청 처리
         // users 테이블에서 모든 데이터 조회 (MYSQL 쿼리문 작성)
         // users 변수에 조회된 데이터 저장
        
         // 조회된 사용자 데이터를 JSON 형식으로 응답
    
         // error 발생 시 다음 미들웨어로 에러 전달
         router.get('/', async (req, res, next) => {
            try {
                const [users] = await promisePool.query('SELECT * FROM users');
                
                res.json(users);
            } catch (error) {
                next(error);
            }
        });

// '/:id/comments' 경로에 대한 GET 요청 처리
    
          // 요청에서 파라미터로 전달된 사용자ID (6장 30쪽 참고)
          router.get('/:id/comments',async(req,res,next)=>{
            try{
                const userId = req.params.id;
                // console.log(userId+"가 id params로 전달됨");
                const [results] = await promisePool.query(
                    `SELECT 
                        comments.id, comments.commenter, comments.comment, comments.created_at,
                        users.name AS userName
                     FROM comments
                     JOIN users ON comments.commenter = users.id
                     WHERE comments.commenter = ?`,
                    [userId]
                );  // commenter이랑 id 쪼인해서 일치하는것만 나열 쭉 하는데, commenter(id)가 userId인 값만 출력
                // console.log('Results:', results);
        // 이런 형태가 만들어지도록 
        //  [
        //    {
        //      id: 1,
        //      commenter: 1,
        //      comment: '안녕하세요. zero의 댓글입니다.',
        //      created_at: 2023-11-20T11:04:47.000Z,
        //      userName : 'zero'
        //    }
        //  ]
        // 프론트엔드 요구조건에 맞추기 위한 코드 (이대로 두시면 됩니다.)
        const comments = results.map(comment => {
            const { userName, ...commentData } = comment;
            return {
                ...commentData,
                User: { name: userName }
            };
        });
        // 여기까지 두시면 됩니다.
         // comments 출력
         // 조회된 댓글 데이터를 JSON 형식으로 응답
         console.log(comments);
            res.json(comments);    
        } 

         // 에러 출력
         // error 발생 시 다음 미들웨어로 에러 전달
         catch(error){
            console.log(error);
            next(error);
        }
    });

// '/' 경로에 대한 POST 요청 처리
    
         // req.body에서 name, age, married 정보 저장
         // 저장된 정보를 이용해서 DB에 저장하는 쿼리문 작성 (7장 29쪽 참고)
         // 성공 여부 반환
    
         // 에러 출력
          // error 발생 시 다음 미들웨어로 에러 전달
          router.post('/',async (req, res, next)=>{
            try{
                const {name, age, married} = req.body;

                const [result] = await promisePool.query(
                    'INSERT INTO users (name, age, married) VALUES (?, ?, ?)',[name, age, married]
                );
                res.json({success:true, id: result.insertId});
            } catch(error){
                next(error);
            }
        });

module.exports = router; // 라우터 객체 모듈로 내보내기