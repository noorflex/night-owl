const bookscontroller = require('../controllers/books');
const categoryController = require('../controllers/category');

const bookstall = require('express').Router();

bookstall.get('/books', bookscontroller.getAllBooks);
bookstall.get('/books/:id', bookscontroller.getBooksById);
bookstall.get('/books/author/:author', bookscontroller.getBooksByAuthor);
bookstall.post('/books/', bookscontroller.createBook);
bookstall.get('/books/category/:category', bookscontroller.getBooksByCategory);
bookstall.get('/books/title/:title', bookscontroller.getBooksByTitle);


bookstall.get('/categories', categoryController.getAllCategory);

module.exports = bookstall;