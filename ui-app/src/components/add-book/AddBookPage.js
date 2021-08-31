import React, { useEffect, useState } from "react"
import "./AddBookPage.css";
import { BOOK_LIST_API_URL, CATEGORY_API_URL } from "../../constants";
import { useHistory } from "react-router";
import { Button, Col, Container, Form, FormLabel, Row } from "react-bootstrap";

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
        price: 0,
        website: ''
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

    const handleWebsiteUrl = (event) => {
        setState({ ...state, website: event.target.value });
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
    return <Container className="add-book-form">
        <Row><h3>Add Book</h3></Row>
        <Form onSubmit={addBook}>
            <Form.Group className="mb-3" controlId="formGroupTitle">
                < Form.Label > Book Title</Form.Label >
                <Form.Control type="text" placeholder="Enter Title of the book" onChange={handleTitle} />
            </Form.Group >
            <Form.Group className="mb-3" controlId="formGroupDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Description" onChange={handleDescription} />
            </Form.Group>
            <Row lg="2">
                <Form.Group className="mb-3" controlId="formGroupAuthor">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="Author" onChange={handleAuthor} />
                </Form.Group>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Category" onChange={handleCategory} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupISBN">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control type="text" placeholder="ISBN" onChange={handleISBN} />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formGroupURL">
                <Form.Label>Image Url</Form.Label>
                <Form.Control type="text" placeholder="e.g http://www.image.com/image1.png" onChange={handleCoverImageUrl} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupWebsiteUrl">
                <Form.Label>Website</Form.Label>
                <Form.Control type="text" placeholder="e.g http://mybook.com/book1.html" onChange={handleWebsiteUrl} />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupPages">
                        <Form.Label>Pages</Form.Label>
                        <Form.Control type="number" placeholder="e.g 120" onChange={handlePages} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupPrice">
                        <Form.Label>Price (INR)</Form.Label>
                        <Form.Control type="number" placeholder="e.g 450" onChange={handlePrice} />
                    </Form.Group>
                </Col>
            </Row>
            <Button variant="primary" type="submit" size="lg">
                {loading ? "Adding please wait" : "Add Book"}
            </Button>
            <Button variant="secondary" type="reset" onClick={(event) => { setState(initialState); setMessage(""); }} className="m-2" size="lg">
                Reset
            </Button>
        </Form >
        <Row><div class="text-success">{message}</div></Row>
    </Container >
}

export default AddBookPage;