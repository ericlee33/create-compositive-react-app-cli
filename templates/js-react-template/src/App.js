import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/routes';
import store from './store/store';
import { Provider, useSelector } from 'react-redux';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes></Routes>
            </Router>
        </Provider>
    );
};

export default App;
