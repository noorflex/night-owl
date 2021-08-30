import { faBook, faHamburger } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getLoggedUserName, isLoggedIn, setLoggedIn } from './login/Auth';

const AppHeader = () => {
    const history = useHistory();
    const [loggedIn, setLoggedInStatus] = useState();
    useEffect(() => {
        let loggedInStatus = isLoggedIn();
        console.log('useEffect AppHeader: Loggedin=' + loggedInStatus);
        setLoggedInStatus(loggedInStatus);
    }, []);
    return <div className='app-header'>
        <div  onClick={(event) => history.push("/books")} className="logo">
            <FontAwesomeIcon icon={faBook} size="2x" color="lightyellow" />
            <a className="header-title">Night Owl</a>
        </div>
        <div className="login-section">
            {loggedIn &&
                <div className="row">
                    <a href="#" onClick={(event) => { history.push("/books/add"); }}>Add Book</a>
                    {isLoggedIn && <div><label>Welcome {getLoggedUserName()}</label>
                        <a href="#" onClick={(event) => { setLoggedIn(""); history.push("/"); }}>(Logout)</a>
                    </div>}
                </div>
            }
        </div>
    </div >
};

export default AppHeader;