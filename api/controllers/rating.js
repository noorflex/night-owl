const db = require('../config/dbconfig');

const getRating = (request, response) => {
    const ratingId = request.params['ratingId'];
    let query = "";
    if (ratingId) {
        query = 'select * from books.ratings rating where rating.rating_id=\'' + ratingId + '\'';
    } else {
        const bookId = request.params['bookId'];
        const userId = request.params['userId'];
        query = 'select * from books.ratings rating where rating.book_id=\'' + bookId + '\' and rating.user_id=\'' + userId + '\'';

    }
    db.query(query, (err, res) => {
        if (err) {
            response.status(500).json(err);
        } else {
            response.status(res.statusCode).json(res.data);
        }
    });
}

const createRating = (request, response) => {

    db.upsert({
        table: 'ratings',
        records: [
            {
                user_id: request.body.userId,
                book_id: request.body.bookId,
                rating: request.body.rating,
                rating_id: request.body.ratingId
            }
        ]
    }, (err, res) => {
        if (err) {
            response.status(500).json(err);
        }
        response.status(200).json(res.data);
    });
}

module.exports = {
    createRating,
    getRating
}