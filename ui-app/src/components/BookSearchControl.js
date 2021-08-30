import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

const BookSearchControl = (props) => {
    const [textToSearch, setTextToSearch] = useState([]);
    return <Container>
        <Row class="justify-content-md-center">
            <Col>
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search by title"
                                aria-label="Recipient's username"
                                aria-describedby="search-icon"
                                onChange={event => setTextToSearch(event.target.value)
                                }
                                onKeyPress={(event) => { if (event.key == "Enter") { props.onClick(textToSearch) } console.log(event.key); }}
                            />
                            <InputGroup.Text id="search-icon" onClick={event => props.onClick(textToSearch)}>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                        </InputGroup>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
};

export default BookSearchControl;