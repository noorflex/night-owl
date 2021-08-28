const db = require('../config/dbconfig');

const login = (request, response) => {
    db.query('select user_id, username from books.users user where user.username=\'' + request.body['username'] + '\'',
        (err, res) => {
            if (err) response.status(500).json(err);
            response.status(200).json(res.data);
        });
};

module.exports = {
    login
}