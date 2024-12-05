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