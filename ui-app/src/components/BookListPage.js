import React, { useEffect, useState } from 'react';
import { BOOK_LIST_API_URL } from '../constants';
import { useHistory } from 'react-router';
import Menu from './Menu';
import BookSearchControl from './BookSearchControl';

const BookListPage = (props) => {
    const history = useHistory();
    const [bookList, updateBookList] = useState([]);
    const [category, setCategory] = useState([]);
    const [categoryChanged, setCategoryChanged] = useState();
    const [titleChanged, setTitleChanged] = useState();
    const [title, setTitle] = useState([]);
    const onChangeTextToSearch = (bookTitle) => {
        setTitleChanged(true);
        console.log("Title changed:" + bookTitle);
        setTitle(bookTitle);
    }

    const onCategoryChanged = (bookCategory) => {
        setCategoryChanged(true);
        console.log("Category changed:" + bookCategory);
        setCategory(bookCategory);
    }

    useEffect(() => {
        console.log('Use effect BookListPage');
        // Make api call and store values
        async function fetchData() {
            let bookListResponse;
            if (categoryChanged) {
                setCategoryChanged(false);
                console.log('Fetch book by category');
                bookListResponse = await fetch(BOOK_LIST_API_URL + "/category/" + category);
            } else if (titleChanged) {
                setTitleChanged(false);
                console.log('Fetch book by title');
                if (title != '') {
                    bookListResponse = await fetch(BOOK_LIST_API_URL + "/title/" + title);
                } else {
                    bookListResponse = await fetch(BOOK_LIST_API_URL);

                }
            } else {
                bookListResponse = await fetch(BOOK_LIST_API_URL);
            }
            console.log('Booklist Response', bookListResponse);
            const bookListJsonData = await bookListResponse.json();
            updateBookList(bookListJsonData);
        };
        fetchData();
    }, [category, title])
    return <div className="list-book-main">
        <div className="book-search-bar">
            <div><Menu onChange={onCategoryChanged} />
            </div>
            <div>
                <BookSearchControl onClick={onChangeTextToSearch} />
            </div>
        </div>
        <div className="list-book">
            {bookList.map(book => {
                return <div className="book">
                    <img className="book-cover" src={book.cover} onClick={() => {
                        history.push(`/bookdetails/${book.id}`);
                    }}></img>
                    <h2 className="book-title">{book.title}</h2>
                    <p className="book-author">by <strong>{book.author}</strong></p>                    
                    <p className="book-rating">Rating: <strong>4/5</strong></p>
                </div>
            })}
        </div>
    </div>
};

export default BookListPage;