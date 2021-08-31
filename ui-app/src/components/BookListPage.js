import React, { useEffect, useState } from 'react';
import { BOOK_LIST_API_URL } from '../constants';
import { useHistory } from 'react-router';
import BookSearchControl from './BookSearchControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircle, faList, faSpinner, faStar } from '@fortawesome/free-solid-svg-icons';
import CategoryList from './bootstrap/CategoryList';
import { Row, Col, Container, Table } from "react-bootstrap";
import Loader from "react-loader-spinner";

const BookListPage = (props) => {
    let currentRating;
    const history = useHistory();
    const [bookList, updateBookList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [booksRating, updateBooksRating] = useState();
    const [category, setCategory] = useState("All");
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
            setLoading(true);
            let bookListResponse;
            if (categoryChanged) {
                setCategoryChanged(false);
                console.log('Fetch book by category');
                if (category != "All") {
                    bookListResponse = await fetch(BOOK_LIST_API_URL + "/category/" + category);
                } else {
                    bookListResponse = await fetch(BOOK_LIST_API_URL);
                }
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
            setLoading(false);
        };
        fetchData();
    }, [category, title])
    return <Container className="book-list-container">
        <Row className="justify-content-md-center mt-2">
            <Col lg="2">
                <CategoryList onCategorySeleceted={onCategoryChanged} selected={category} />
            </Col>
            <Col lg="5">
                <BookSearchControl onClick={onChangeTextToSearch} />
            </Col>
            <Col lg="1">
                <FontAwesomeIcon icon={listView ? faBars : faList} className="search-icon"
                    onClick={(event) => setListView(!listView)} />
            </Col>
        </Row>
        <div>
            {loading ? <Loader className="center-display"
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={300000} //3 secs
            /> :
                <div className={listView ? "list-view-book" : "grid-view-book"} > {
                    !listView ? bookList.map(book => {
                        return <div className="fast-transition">
                            <Col className="book-tiles">
                                <Row>
                                    <a className="book" onClick={() => {
                                        history.push(`/bookdetails/${book.id}`);
                                    }}>
                                        <img className="book-cover" src={book.coverImageUrl}></img>
                                    </a>
                                </Row>
                                <Row>
                                    <div>
                                        <Row className="book-title" onClick={() => {
                                            history.push(`/bookdetails/${book.id}`);
                                        }}>{book.title}</Row>
                                        <Row className="book-category mb-2">{book.category}</Row>
                                        <Row className="mb-2">
                                            <Col lg="3" className="book-rating">{getRatingForBook(book.id) == 0 ? "-" : getRatingForBook(book.id)}
                                                <span><FontAwesomeIcon icon={faStar} size="sm" className="star-icon" /></span></Col>
                                            <Col lg="6">({getUserCountOfRatingForBook(book.id)} Ratings)</Col>
                                        </Row>
                                        <Row className="book-price">Rs {book.price}</Row>
                                    </div>
                                </Row>
                            </Col>
                        </div>
                    }) : bookList.map(book => {
                        return <Container fluid>
                            <Row className="border-bottom pb-4">
                                <Col lg="3">
                                    <div className="book-cover-wrapper" >
                                        <img className="book-cover" src={book.coverImageUrl} onClick={() => {
                                            history.push(`/bookdetails/${book.id}`);
                                        }}></img>
                                    </div>
                                </Col>
                                <Col lg="7">
                                    <Table borderless>
                                        <tbody>
                                            <tr>
                                                <td className="text-secondary">Title</td>
                                                <td><div className="text-lg" onClick={() => {
                                                    history.push(`/bookdetails/${book.id}`);
                                                }}>{book.title}</div></td>
                                            </tr>
                                            <tr>
                                                <td className="text-secondary">About Book</td>
                                                <td className="text-secondary">{book.description}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-secondary">Rating</td>
                                                <td>
                                                    {getUserCountOfRatingForBook(book.id) == 0 ? <div>Not Rated</div> :
                                                        <div>
                                                            <span className="book-rating">{getRatingForBook(book.id)}
                                                                <span><FontAwesomeIcon icon={faStar} size="sm" className="star-icon" />
                                                                </span>
                                                            </span>
                                                            <span className="p-2">
                                                                ({getUserCountOfRatingForBook(book.id)} Ratings)
                                                            </span>
                                                        </div>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-secondary">Price</td>
                                                <td>{book.price}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Container>
                    })}
                    {bookList.length === 0 && <div className="center-display">No Items to Display</div>}
                </div>
            }</div>
    </Container >
};

export default BookListPage;