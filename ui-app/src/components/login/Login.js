import React, { useState } from "react";
import { LOGIN_URL } from "../../constants";
import "./Login.css";
import { getLoggedUserName, isLoggedIn, setLoggedIn, setLoggedInUser } from "./Auth";
import { useHistory } from "react-router";
import { Container, Row, Col, Button, FloatingLabel, Form } from "react-bootstrap";

const Login = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();
    const validateForm = () => {
        return username.length > 0 && password.length > 0;
    }

    const loginUser = (credentials) => {
        return fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(data => data.json());
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken = token[0];
        if (setToken) {
            setLoggedIn(token[0]);
            setLoggedInUser(token[0].user_id, token[0].username);
            history.push("/books");
        } else {
            setError("Invalid username or password")
        }
    }

    return (
        <Container className="justify-content-md-center login-form  p-8">
            {isLoggedIn() ? <div>
                <div>You are logged in as {getLoggedUserName()}</div>
                <div><a href="#" onClick={(event) => setLoggedIn("")}>Click Here</a> to Logout out</div>
                <div><a href="/books">Explore Books</a></div>
            </div> :
                <Col>
                    <Row><h2>Please Log In</h2></Row>
                    <Row><div className="error">{error}</div></Row>
                    <Row>
                        <Form onSubmit={handleSubmit}>
                            <FloatingLabel controlId="username" label="username" className="mb-3">
                                <Form.Control type="text" placeholder="bob" onChange={e => setUsername(e.target.value)} >
                                </Form.Control>
                            </FloatingLabel>
                            <FloatingLabel controlId="password" label="password">
                                <Form.Control type="password" placeholder="password" onChange={e => setPassword(e.target.value)} >
                                </Form.Control>
                            </FloatingLabel>
                            <Row>
                                <Col><Button variant="primary" type="submit">Login</Button></Col>
                                <Col className="mt-4 pt-2"><a href="/books">Explore Books</a></Col>
                            </Row>
                            <div className="text-secondary mt-2">Please refresh the page after login to Logout option/Username Display</div>
                            <div className="text-secondary">username: bob, alex, noor/ password anything</div>
                        </Form>
                    </Row>
                </Col>
            }
        </Container >
    )
}

export default Login;