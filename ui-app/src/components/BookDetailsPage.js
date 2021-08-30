import { useEffect, useState } from "react";
import { getLoggedUserId, getLoggedUserName, isLoggedIn } from "./login/Auth";
import { useParams } from "react-router";
import { BOOK_LIST_API_URL, RATINGS_API_URL } from "../constants";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const BookDetailsPage = () => {
    const params = useParams();
    const [book, setBook] = useState([]);
    const [bookRating, setBookRating] = useState();
    const [ratingUpdateStatus, setRatingUpdateStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [myRating, setMyRating] = useState({ rating: 0 });

    const ratingChanged = (newRating) => {
        let requestOptions;
        requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: getLoggedUserId(),
                bookId: book.id,
                rating: newRating,
                ratingId: myRating.rating_id
            })
        }
        fetch(RATINGS_API_URL, requestOptions)
            .then(response => {
                setRatingUpdateStatus('updated');
                setTimeout(() => setRatingUpdateStatus(null), 2000); //clear rating in 2 seconds
            })
            .catch((err) => setRatingUpdateStatus('error'));
    };

    const getBookRating = () => {
        if (!bookRating || bookRating == null) return "";
        return bookRating[0].ratingSum / bookRating[0].numberOfRatings;
    }

    const getNumberOfRatings = () => {
        if (!bookRating || bookRating == null) return "";
        return bookRating[0].numberOfRatings;
    }

    useEffect(() => {
        async function fetchBookDetails() {
            const id = params.id;
            const url = BOOK_LIST_API_URL + "/" + id;
            const bookResponse = await fetch(url);
            const bookJson = await bookResponse.json();
            const rating = await fetch(BOOK_LIST_API_URL + "/ratings", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "bookIds": [bookJson[0].id] })
            });
            setBookRating(await rating.json());
            setLoading(false);
            setBook(bookJson[0]);
            return bookJson[0];
        }

        async function fetchBookRating(bookId) {
            const ratingUrl = RATINGS_API_URL + "/book/" + bookId + "/user/" + getLoggedUserId();
            const ratingResponse = await fetch(ratingUrl);
            const ratingResponseJson = await ratingResponse.json();
            console.log('My Rating:' + ratingResponseJson);
            if (ratingResponseJson != null && ratingResponseJson.length != 0) {
                setMyRating(ratingResponseJson[0]);
            }
        }
        fetchBookDetails().then((book) => fetchBookRating(book.id));
    }, []);
    return <div className="book-details-view-wrapper">
        <div className="book-details-view">
            {loading ? <div className="loading-icon">Loading please wait...</div>
                : <div>
                    <div className="book-details-top-row">
                        <div className="book-cover"><img src={book.coverImageUrl}></img></div>
                        <div className="column">
                            <div className="book-title">{book.title}</div>
                            <div>
                                <div className="book-detail-row">
                                    <div className="label-text">Description</div>
                                    <div className="content book-description">{book.description}</div>
                                </div>
                                <div className="book-detail-row">
                                    <div className="label-text">Author</div>
                                    <div className="content">{book.author}</div>
                                </div>
                                <div className="book-detail-row">
                                    <div className="label-text">Price</div>
                                    <div className="content">{book.price}</div>
                                </div>
                                <div className="book-detail-row">
                                    <div className="label-text">Category</div>
                                    <div className="content  book-category">{book.category}</div>
                                </div>
                                <div className="book-detail-row">
                                    <div className="label-text">Rating</div>
                                    <div className="content book-rating">
                                        <div>{getBookRating()}<FontAwesomeIcon icon={faStar} size="sm" /></div> ({getNumberOfRatings()} Reviews)</div>
                                </div>
                                <div className="book-detail-row">
                                    <div className="label-text"> Your Rating</div>
                                    <div className="content">
                                        {myRating === undefined || myRating.rating === 0 ?
                                            <ReactStars
                                                count={5}
                                                onChange={ratingChanged}
                                                size={24}
                                                activeColor="#ffd700"
                                            /> :
                                            <div>
                                                <ReactStars
                                                    count={5}
                                                    value={myRating.rating}
                                                    onChange={ratingChanged}
                                                    size={24}
                                                    activeColor="#ffd700"
                                                />
                                            </div>
                                        }
                                        {ratingUpdateStatus == 'updated' ? <span>Rating updated</span> : ratingUpdateStatus == 'error' ? <span>An error occured</span> : ""}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>}
        </div>
    </div>
}

export default BookDetailsPage;