const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { afterUploadImage, uploadPost, like, dislike,deletePost /*Todo controller/post에서 기능만들기 및 가져오기 */ } = require('../controllers/post');
const { isLoggedIn } = require('../middlewares');



const router = express.Router();

try {
    fs.readdirSync('uploads');
} catch (err) {
    console.error('uploads 폴더 없음: 폴더 생성');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

// POST /post/img
router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);

// POST /post
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), uploadPost);

/* Todo */
// 라우팅 추가하기.

    // POST /post/${myId.value}/like
router.post('/:myId/like', isLoggedIn, like);

    // delete /post/${postId}/dislike/${myId}
router.delete('/:postId/dislike/:myId', isLoggedIn, dislike);
    // delete /post/${postId}
router.delete('/:postId', isLoggedIn, deletePost);
module.exports = router;