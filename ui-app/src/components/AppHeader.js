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
        <div><a className="header-title">Night Owl</a></div>
        <div className="login-button">
            {loggedIn &&
                <div>
                    <button type="button" onClick={(event) => { setLoggedIn(""); history.push("/"); }}>Logout</button>
                    <button type="button">Welcome {getLoggedUserName}</button>
                    <button type="button" onClick={(event) => { history.push("/books/add"); }}>Add Book</button>
                </div>
            }
            {!loggedIn && <button type="button">Login</button>}
        </div>
    </div >
};

export default AppHeader;