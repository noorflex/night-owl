import React, { useEffect, useState } from 'react';
import { BOOK_LIST_API_URL } from '../constants';
import { useHistory } from 'react-router';
import Menu from './Menu';
import BookSearchControl from './BookSearchControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faList, faSearch, faStar } from '@fortawesome/free-solid-svg-icons';

const BookListPage = (props) => {
    const history = useHistory();
    const [bookList, updateBookList] = useState([]);
    const [category, setCategory] = useState([]);
    const [listView, setListView] = useState(false);
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
            {
                <div class="toggle-view">
                    <FontAwesomeIcon icon={listView ? faBars : faList} className="search-icon"
                        onClick={(event) => setListView(!listView)} />
                </div>
            }
        </div>
        <div></div>

        <div className={listView ? "list-view-book" : "grid-view-book"} >            {
            !listView ? bookList.map(book => {
                return <div className="fast-transition">
                    <div className="book">
                        <img className="book-cover" src={book.cover} onClick={() => {
                            history.push(`/bookdetails/${book.id}`);
                        }}></img>
                    </div>
                    <div className="book-detail-view">
                        <div className="book-title">{book.title}</div>
                        <div className="book-category">{book.category}</div>
                        <div className="book-rating">4.3<span><FontAwesomeIcon icon={faStar} size="sm" className="star-icon" /></span></div>
                        <div className="book-price">Rs {book.price}</div>
                    </div>
                </div>
            }) : bookList.map(book => {
                return <div className="book-row-view">
                    <div className="book-cover-wrapper" onClick={() => {
                        history.push(`/bookdetails/${book.id}`);
                    }}>
                        <img className="book-cover" src={book.cover}></img>
                    </div>
                    <div className="row">
                        <div className="column mr-5">
                            <div class="label-text">Title</div>
                            <div class="label-text">Rating</div>
                            <div class="label-text">About Book</div>
                            <div class="label-text">Price</div>
                        </div>
                        <div className="column">
                            <div className="book-title" onClick={() => {
                                history.push(`/bookdetails/${book.id}`);
                            }}>{book.title}</div>
                            <div className="book-rating">4.3<span><FontAwesomeIcon icon={faStar} size="sm" className="star-icon" /></span></div>
                            <div className="book-description">{book.description}</div>
                            <div className="book-price">{book.price} INR</div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div >
};

export default BookListPage;