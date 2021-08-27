const usercontroller = require('../controllers/user');

const login = require('express').Router();

login.get('/', usercontroller.login);
login.post('/', usercontroller.login);

module.exports = login;