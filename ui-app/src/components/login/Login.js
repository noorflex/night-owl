import React, { useState } from "react";
import { LOGIN_URL } from "../../constants";
import "./Login.css";
import { setLoggedIn, setLoggedInUser } from "./Auth";
import { useHistory } from "react-router";

const Login = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
        setLoggedIn(token[0]);
        setLoggedInUser(token[0].user_id, token[0].username);
        history.push("/books");
    }

    return (
        <div className="login-form">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" className="form-field" onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" className="form-field" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login;