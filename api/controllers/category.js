const db = require('../config/dbconfig');

const createCategory = (request, response) => {

};
const getAllCategory = (request, response) => {
    db.query('select * from books.category', (error, res) => {
        console.log('category response', res);
        if (error) response.status(500).json(error);
        response.status(200).json(res.data);
    });
};
const getCategoryById = (request, response) => {

};
const updateCategory = (request, response) => {

};
const deleteCatogoryById = (request, response) => {

};

module.exports = {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCatogoryById
}