const bookscontroller = require('../controllers/books');
const categoryController = require('../controllers/category');
const ratingsController = require('../controllers/rating');

const bookstall = require('express').Router();

bookstall.get('/books', bookscontroller.getAllBooks);
bookstall.get('/books/:id', bookscontroller.getBooksById);
bookstall.get('/books/author/:author', bookscontroller.getBooksByAuthor);
bookstall.post('/books/', bookscontroller.createBook);
bookstall.get('/books/category/:category', bookscontroller.getBooksByCategory);
bookstall.get('/books/title/:title', bookscontroller.getBooksByTitle);
bookstall.post('/books/ratings/', bookscontroller.getBooksRating); // pass array of bookIds


bookstall.get('/categories', categoryController.getAllCategory);
bookstall.post('/rating', ratingsController.createRating);
bookstall.get('/rating/:ratingId', ratingsController.getRating);
bookstall.get('/rating/book/:bookId/user/:userId', ratingsController.getRating);

module.exports = bookstall;