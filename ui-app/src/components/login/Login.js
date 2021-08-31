import React, { useState } from "react";
import { LOGIN_URL } from "../../constants";
import "./Login.css";
import { setLoggedIn, setLoggedInUser } from "./Auth";
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
            <Col>
                <Row><h2>Please Log In</h2></Row>
                <Row><div className="error">{error}</div></Row>
                <Row>
                    <Form onSubmit={handleSubmit}>
                        <Row className="m-2">
                            <FloatingLabel controlId="username" label="username">
                                <Form.Control type="text" placeholder="bob" onChange={e => setUsername(e.target.value)} >
                                </Form.Control>
                            </FloatingLabel>
                        </Row>
                        <Row className="m-2">
                            <FloatingLabel controlId="password" label="password">
                                <Form.Control type="password" placeholder="password" onChange={e => setPassword(e.target.value)} >
                                </Form.Control>
                            </FloatingLabel>
                        </Row>
                        <Row className="p-4">
                            <Button variant="primary" type="submit">Login</Button>
                        </Row>
                    </Form>
                </Row>
            </Col>
        </Container>
    )
}

export default Login;