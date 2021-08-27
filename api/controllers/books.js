const db = require('../config/dbconfig');
/**
    Book table will have following field
    book_id
    author
    category_id
    cover
    description
    isbn
    pages
    title
    website
 */
const getAllBooks = (request, response) => {
    db.query('select * from books.book book', (err, res) => {
        if (err) {
            response.status(500).json(err);
        } else {
            response.status(res.statusCode).json(res.data);
        }
    });
}

const getBooksById = (request, response) => {
    const id = request.params['id'];
    const query = 'select * from books.book book where id=\'' + id + '\'';
    db.query(query, (err, res) => {
        if (err) {
            response.status(500).json(err);
        } else {
            response.status(res.statusCode).json(res.data);
        }
    });
}

/**
 * Get Books by Author name, where author name should be
 * exactly matching 
 */
const getBooksByAuthor = (request, response) => {
    const author = request.params['author'];
    const query = 'select * from books.book book where book.author=\'' + author + '\'';
    db.query(query, (err, res) => {
        if (err) {
            response.status(500).json(err);
        } else {
            response.status(res.statusCode).json(res.data);
        }
    });
}

const createBook = (request, response) => {
    const book = request.body
    db.insert({
        table: 'book',
        records: [
            book
        ]
    }, (error, res) => {
        if (error) {
            console.log(error);
            response.status(500).json(error);
        }
        response.status(res.statusCode).json(res.body);
    });
}

const getBooksByCategory = (request, response) => {
    const category = request.params['category'];
    let query = "select * from books.book book"
    if (category !== null && category !== "") {
        query += ' where book.category=\'' + category + '\'';
    }
    db.query(query, (err, res) => {
        if (err) {
            response.status(500).json(err);
        } else {
            response.status(res.statusCode).json(res.data);
        }
    });
}

const getBooksByTitle = (request, response) => {
    const title = request.params['title'];
    const query = 'select * from books.book book where book.title like \'%' + title + '%\'';
    db.query(query, (err, res) => {
        if (err) {
            response.status(500).json(err);
        } else {
            response.status(res.statusCode).json(res.data);
        }
    });
}

module.exports = {
    createBook,
    getAllBooks,
    getBooksById,
    getBooksByAuthor,
    getBooksByCategory,
    getBooksByTitle
}