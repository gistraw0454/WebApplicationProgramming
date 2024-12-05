const express = require('express');

const { isLoggedIn } = require('../middlewares');
const { follow } = require('../controllers/user');

const router = express.Router();

// POST /user/:id/follow
router.post('/:id/follow', isLoggedIn, follow); //로그인이 되어있으면 follow를 따라간다.

module.exports = router;