import { useEffect, useState } from "react";
import { getLoggedUserId, getLoggedUserName, isLoggedIn } from "./login/Auth";
import { useParams } from "react-router";
import { BOOK_LIST_API_URL, RATINGS_API_URL } from "../constants";
import ReactStars from "react-rating-stars-component";

const BookDetailsPage = () => {
    const params = useParams();
    const [book, setBook] = useState([]);
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

    useEffect(() => {
        async function fetchBookDetails() {
            const id = params.id;
            const url = BOOK_LIST_API_URL + "/" + id;
            const bookResponse = await fetch(url);
            const bookJson = await bookResponse.json();
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
    return <div>
        {loading ? <div className="loading-icon">Loading please wait...</div>
            : <div><div>Book Details</div>
                <div>Your Rating:
                    {myRating.rating === 0 ?

                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={48}
                            activeColor="#ffd700"
                        /> :
                        <div>
                            <div>Hello</div>
                            <ReactStars
                                count={5}
                                value={myRating.rating}
                                onChange={ratingChanged}
                                size={48}
                                activeColor="#ffd700"
                            />
                        </div>
                    }
                    {ratingUpdateStatus == 'updated' ? <span>Rating updated</span> : ratingUpdateStatus == 'error' ? <span>An error occured</span> : ""}
                </div>
                <div><img src={book.coverImageUrl}></img></div>
                <div>Book ID: {book.id}</div>
                <div>Book Title: {book.title}</div>
                <div>Book Author: {book.author}</div>
                <div>Logged In : {getLoggedUserName()}</div>
                <div>Rating:<ReactStars
                    count={5}
                    size={36}
                    activeColor="#ffd700"
                /></div></div>}
    </div>

}

export default BookDetailsPage;