const bookstall = require('./bookstall');
const login = require('./login');

const router = require('express').Router();

router.use('/api', bookstall);
router.use('/login', login);

module.exports = router;
