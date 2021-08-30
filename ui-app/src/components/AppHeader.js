import { faBook, faHamburger } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Container, Row, Col } from "react-bootstrap";
import { getLoggedUserName, isLoggedIn, setLoggedIn } from './login/Auth';

const AppHeader = () => {
    const history = useHistory();
    const [loggedIn, setLoggedInStatus] = useState();
    useEffect(() => {
        let loggedInStatus = isLoggedIn();
        console.log('useEffect AppHeader: Loggedin=' + loggedInStatus);
        setLoggedInStatus(loggedInStatus);
    }, []);
    return <Container fluid>
        <Row className="app-header">
            <Col lg="9">
                <div onClick={(event) => history.push("/books")} className="logo">
                    <FontAwesomeIcon icon={faBook} size="2x" color="lightyellow" />
                    <a className="header-title">Night Owl</a>
                </div></Col>
            <Col>
                {loggedIn &&
                    <Row className="login-section">
                        <Col lg="5">
                            <a href="#" onClick={(event) => { history.push("/books/add"); }}>Add Book</a>
                        </Col>
                        <Col lg="7">
                            {isLoggedIn &&
                                <div>
                                    <label>Welcome {getLoggedUserName()}</label>
                                    <a href="#" onClick={(event) => { setLoggedIn(""); history.push("/"); }}>(Logout)</a>
                                </div>}
                        </Col>
                    </Row>
                }</Col>
        </Row>
    </Container>
};

export default AppHeader;