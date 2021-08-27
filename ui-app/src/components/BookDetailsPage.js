import { useEffect, useState } from "react";
import { getLoggedUserName, isLoggedIn } from "./login/Auth";
import { useParams } from "react-router";
import { BOOK_LIST_API_URL } from "../constants";
import ReactStars from "react-rating-stars-component";

const BookDetailsPage = () => {
    const params = useParams();
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(true);

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    useEffect(() => {
        async function fetchBookDetails() {
            const id = params.id;
            const url = BOOK_LIST_API_URL + "/" + id;
            const bookResponse = await fetch(url);
            const bookJson = await bookResponse.json();
            setLoading(false);
            setBook(bookJson[0]);
        }
        fetchBookDetails();
    }, []);
    return <div>
        {loading ? <div className="loading-icon">Loading please wait...</div>
            : <div><div>Book Details</div>
                <div><img src={book.cover}></img></div>
                <div>Book ID: {book.id}</div>
                <div>Book Title: {book.title}</div>
                <div>Book Author: {book.author}</div>
                <div>Logged In : {getLoggedUserName()}</div>
                <div><ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={36}
                    activeColor="#ffd700"
                /></div></div>}
    </div>

}

export default BookDetailsPage;