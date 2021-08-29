import React from 'react';
import { Route, Switch } from 'react-router';
import BookListPage from './BookListPage';
import AppHeader from './AppHeader';
import Login from './login/Login';
import BookDetailsPage from './BookDetailsPage';
import AddBookPage from './add-book/AddBookPage';

const AppContainer = () => <div>
    <AppHeader />
    <Switch>
        <Route exact path={'/'} component={Login} />
        <Route exact path={'/books'} component={BookListPage} />
        <Route exact path="/books/category/:category" component={BookListPage} />
        <Route exact path="/books/title/:title" component={BookListPage} />
        <Route exact path="/bookdetails/:id" component={BookDetailsPage} />
        <Route exact path="/books/add" component={AddBookPage} />
    </Switch>
</div>;

export default AppContainer;
