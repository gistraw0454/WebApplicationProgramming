const db = require(process.cwd() + '/models');

exports.afterUploadImage = (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
};

exports.uploadPost = async (req, res, next) => {
    try {
        const [postInsertResult] = await db.execute('INSERT INTO posts (content, img, userId) VALUES (?, ?, ?)',
            [req.body.content, req.body.url, req.user.id]);
        const [posts] = await db.execute('SELECT * FROM posts WHERE id=?', [postInsertResult.insertId]);
        const post = posts[0];

        const hashtags = req.body.content.match(/#[^\s#]*/g);
        if (hashtags) {
            await Promise.all(
                hashtags.map(async t => {
                    const tag = t.slice(1).toLowerCase();
                    const [tagInsertResult] = await db.execute('INSERT INTO hashtags (title) VALUES (?) ON DUPLICATE KEY UPDATE updatedAt=now();', [tag]);
                    db.execute('INSERT INTO postHashtag (postId, hashtagId) VALUES (?, ?)',
                        [post.id, tagInsertResult.insertId]);
                })
            );
        }
        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
};

/* Todo */
// 게시글 삭제와 좋아요, 좋아요 취소 기능 구현 및 내보내기
// delete의 경우 res.redirect('/') 하지 않기
exports.like = async (req, res, next) => {
    try {
        // 해당하는 post rows에 담고 post가 존재하는지 확인
        const [rows] = await db.execute('SELECT * FROM posts WHERE id=?', [req.body.postId]);
        if (rows.length > 0) {  // 존재하면
            await db.execute('INSERT IGNORE INTO postlikes (postId, userId) VALUES (?, ?)',
                [req.body.postId, req.params.myId]);
            res.send('success');
        } else {
            res.status(404).send('no post');
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};
exports.dislike = async (req, res, next) => {
    try {
        // 게시글 존재 여부 확인
        const [rows] = await db.execute('SELECT * FROM posts WHERE id=?', [req.params.postId]);

        if (rows.length > 0) {
            await db.execute('DELETE FROM postlikes WHERE postId=? AND userId=?',
                [req.params.postId, req.params.myId]);
            res.send('success');
        }
        else{
            res.status(404).send('no post');
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const postId = req.params.postId;

        const [rows] = await db.execute('SELECT * FROM posts WHERE id=?', [postId]);

        if (rows.length > 0) {
            await db.execute('DELETE FROM posts WHERE id=?', [postId]);
            res.status(200).send('success');
        } else {
            res.status(404).send('no post');
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};