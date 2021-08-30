import React, { useEffect, useState } from "react"
import "./AddBookPage.css";
import { BOOK_LIST_API_URL, CATEGORY_API_URL } from "../../constants";
import { useHistory } from "react-router";

const AddBookPage = () => {
    const history = useHistory();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [state, setState] = useState({
        title: '',
        description: '',
        author: '',
        isbn: '',
        coverImageUrl: '',
        pages: 0,
        price: 0

    });

    const initialState = {
        title: '',
        description: '',
        author: '',
        isbn: '',
        coverImageUrl: '',
        pages: 0,
        price: 0
    };

    useEffect(() => {
        function loadCategories() {
            fetch(CATEGORY_API_URL).then((categories) => setCategories(categories));
        }

        loadCategories();
    }, []);
    const handleInputChange = (event) => {
        const value = event.target.value;
    }

    const handleTitle = (event) => {
        setState({ ...state, title: event.target.value });
    }
    const handleDescription = (event) => {
        setState({ ...state, description: event.target.value });
    }
    const handleAuthor = (event) => {
        setState({ ...state, author: event.target.value });
    }
    const handleCategory = (event) => {
        setState({ ...state, category: event.target.value });
    }
    const handleISBN = (event) => {
        setState({ ...state, isbn: event.target.value });
    }
    const handleCoverImageUrl = (event) => {
        setState({ ...state, coverImageUrl: event.target.value });
    }
    const handlePages = (event) => {
        setState({ ...state, pages: event.target.value });
    }

    const handlePrice = (event) => {
        setState({ ...state, price: event.target.value });
    }

    const addBook = (event) => {
        event.preventDefault();
        alert(JSON.stringify(state));
        setLoading(true);
        fetch(BOOK_LIST_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
        }).then(() => {
            setMessage(`Successfully Added Book ${state.title}`);
            setLoading(false);
        }, (err) => {
            setError(`Failed to add Book,Please try again ${err}`);
            setLoading(false);
        })
    }
    return <div className="add-book-wrapper">
        <form id="addBookForm" onSubmit={addBook}>
            <h3>Add Book</h3>
            {error != "" && <div className="error">{error}</div>}
            {message != "" && <div>{message}</div>}
            <div className="add-book-form">
                <a onClick={(event) => { document.getElementById("addBookForm").reset(); }} href="#">Clear</a>
                <input className="input" id="title" type="text" placeholder="Title" onChange={handleTitle} />
                <textarea className="input" id="description" placeholder="Description" onChange={handleDescription} />
                <div className="row">
                    <input className="input" id="author" type="text" placeholder="Author" onChange={handleAuthor}></input>
                    <input className="input" id="category" type="text" placeholder="Category" onChange={handleCategory}></input>
                </div>
                <input className="input" id="isbn" type="text" placeholder="ISBN" onChange={handleISBN}></input>
                <input className="input" id="cover" type="text" placeholder="URL of the cover image" onChange={handleCoverImageUrl}></input>
                <div>
                    <input className="input" id="pages" type="number" min="1" max="5000" placeholder="Pages" onChange={handlePages}></input>
                    <input className="input" id="price" type="number" min="1" max="50000" placeholder="Price" onChange={handlePrice}></input>
                </div>
                <div>
                    <input type="submit" id="addBookButton" value={loading ? "Adding Book..." : "Add Book"} disabled={loading} />
                    <input type="button" id="cancelButton" value="Cancel" onClick={(event) => { history.push("/books") }} />
                </div>
            </div>
        </form>
    </div >
}

export default AddBookPage;