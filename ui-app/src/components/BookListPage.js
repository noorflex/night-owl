import React, { useEffect, useState } from 'react';
import { BOOK_LIST_API_URL } from '../constants';
import { useHistory } from 'react-router';
import Menu from './Menu';
import BookSearchControl from './BookSearchControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faList, faStar } from '@fortawesome/free-solid-svg-icons';
import CategoryList from './bootstrap/CategoryList';
import { Row, Col, Container } from "react-bootstrap";

const BookListPage = (props) => {
    let currentRating;
    const history = useHistory();
    const [bookList, updateBookList] = useState([]);
    const [booksRating, updateBooksRating] = useState();
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

    const getRatingForBook = (bookId) => {
        if (!booksRating || booksRating.length == 0) return 0;
        const bookRatingForCurrentBook = booksRating.filter(
            currentBookRating => currentBookRating.book_id === bookId);
        if (!bookRatingForCurrentBook || bookRatingForCurrentBook.length == 0) return 0;
        console.log('filter applied BookId:' + bookId);
        console.log('After filtering:', bookRatingForCurrentBook);
        const sumOfAllRatings = bookRatingForCurrentBook[0].ratingSum;
        const numberOfRating = bookRatingForCurrentBook[0].numberOfRatings;
        const rating = (sumOfAllRatings / numberOfRating).toFixed(1);
        console.log(`rating for bookid ${bookId} is ${rating}`);
        return rating;
    }

    const getUserCountOfRatingForBook = (bookId) => {
        if (!booksRating || booksRating.length == 0) return 0;
        const bookRatingForCurrentBook = booksRating.filter(bookRating => bookRating.book_id === bookId);
        if (!bookRatingForCurrentBook || bookRatingForCurrentBook.length == 0) return 0;
        return bookRatingForCurrentBook[0].numberOfRatings;
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
            const bookIds = bookListJsonData.map(bookDetail => bookDetail.id);
            const booksRatingResponse = await fetch(BOOK_LIST_API_URL + "/ratings", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "bookIds": bookIds })
            });
            const booksRatingJson = await booksRatingResponse.json();

            console.log('books rating', booksRatingJson);

            updateBooksRating(booksRatingJson);
            updateBookList(bookListJsonData);
        };
        fetchData();
    }, [category, title])
    return <Container>
        <Row className="justify-content-md-center mt-2">
            <Col lg="2">
                <CategoryList />
            </Col>
            <Col lg="5">
                <BookSearchControl onClick={onChangeTextToSearch} />
            </Col>
            <Col lg="1">
                <FontAwesomeIcon icon={listView ? faBars : faList} className="search-icon"
                    onClick={(event) => setListView(!listView)} />
            </Col>
        </Row>
        <div className={listView ? "list-view-book" : "grid-view-book"} >            {
            !listView ? bookList.map(book => {
                return <div className="fast-transition">
                    <a className="book" onClick={() => {
                        history.push(`/bookdetails/${book.id}`);
                    }}>
                        <img className="book-cover" src={book.coverImageUrl}></img>
                    </a>
                    <div className="book-detail-view">
                        <div className="book-title" onClick={() => {
                            history.push(`/bookdetails/${book.id}`);
                        }}>{book.title}</div>
                        <div className="book-category">{book.category}</div>
                        <div className="row">
                            <div className="book-rating">{getRatingForBook(book.id) == 0 ? "-" : getRatingForBook(book.id)}<span><FontAwesomeIcon icon={faStar} size="sm" className="star-icon" /></span></div>
                            <div className="book-category">({getUserCountOfRatingForBook(book.id)} Ratings)</div>
                        </div>
                        <div className="book-price">Rs {book.price}</div>
                    </div>
                </div>
            }) : bookList.map(book => {
                return <div className="book-row-view">
                    <div className="book-cover-wrapper" >
                        <img className="book-cover" src={book.coverImageUrl} onClick={() => {
                            history.push(`/bookdetails/${book.id}`);
                        }}></img>
                    </div>
                    <div className="row">
                        <div className="column mr-5">
                            <div className="label-text">Title</div>
                            <div className="label-text">Rating</div>
                            <div className="label-text">About Book</div>
                            <div className="label-text">Price</div>
                        </div>
                        <div className="column">
                            <div className="book-title" onClick={() => {
                                history.push(`/bookdetails/${book.id}`);
                            }}>{book.title}</div>
                            <div className="row">
                                {getUserCountOfRatingForBook(book.id) == 0 ? <div>Not Rated</div> :
                                    <div>
                                        <div className="book-rating">{getRatingForBook(book.id)}
                                            <span><FontAwesomeIcon icon={faStar} size="sm" className="star-icon" /></span>
                                        </div>
                                        <div className="book-category">({getUserCountOfRatingForBook(book.id)} Ratings)</div>
                                    </div>
                                }
                            </div>
                            <div className="book-description">{book.description}</div>
                            <div className="book-price">{book.price} INR</div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </Container>
};

export default BookListPage;