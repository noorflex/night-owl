import React from 'react';
import { Route, Switch } from 'react-router';
import BookListPage from './BookListPage';
import AppHeader from './AppHeader';
import Login from './login/Login';
import BookDetailsPage from './BookDetailsPage';

const AppContainer = () => {
    return <div>
        <AppHeader />
        <Switch>
            <Route exact path={'/'} component={Login} />
            <Route exact path={'/books'} component={BookListPage} />
            <Route exact path="/books/category/:category" component={BookListPage} />
            <Route exact path="/books/title/:title" component={BookListPage} />
            <Route exact path="/bookdetails/:id" component={BookDetailsPage} />
        </Switch>
    </div>;
};

export default AppContainer;
