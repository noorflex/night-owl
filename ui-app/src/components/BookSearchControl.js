import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const BookSearchControl = (props) => {
    const [textToSearch, setTextToSearch] = useState([]);
    return <div className='book-search-header'>
        <div><a className="book-search-title">Find Books:</a></div>
        <div className="search-box">
            <input type="text" className="header-search" placeholder="Search by title" id="text-to-search"
                onChange={event => setTextToSearch(event.target.value)} />
            <a className="search-icon-div" onClick={event => props.onClick(textToSearch)}>
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </a>
        </div>
    </div>
};

export default BookSearchControl;