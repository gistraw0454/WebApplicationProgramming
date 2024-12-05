const db = require(process.cwd() + '/models');

exports.renderProfile = (req, res) => {
    res.render('profile', {title: '내 정보 - NodeBird'});
};

exports.renderJoin = (req, res) => {
    res.render('join', { title: '회원가입 - NodeBird' });
};

exports.renderMain = async (req, res, next) => {
    try {
        const [posts] = await db.execute('SELECT p.*, u.id userId, u.nick userNick FROM posts p, users u WHERE p.userId=u.id ORDER BY createdAt DESC');
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.renderHashtag = async (req, res, next) => {
    const query = req.query.hashtag;
    if (!query) {
        return res.redirect('/');
    }
    try {
        const [rows] = await db.execute('SELECT * FROM hashtags WHERE title=?', [query]);
        let posts = [];
        if (rows.length > 0) {
            const tag = rows[0];
            [posts] = await db.execute('SELECT p.*, u.id userId, u.nick userNick FROM posts p, users u, postHashtag ph WHERE p.userId=u.id AND ph.postId=p.id AND ph.hashtagId=? ORDER BY createdAt DESC', [tag.id]);
        }
        res.render('main', {
            title: `${query} | NodeBird`,
            twits: posts,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};