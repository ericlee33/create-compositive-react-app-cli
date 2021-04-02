import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/routes';
import store from './store/store';
import { Provider, useSelector } from 'react-redux';
import { setting } from './config';

const App = () => {
    return (
        <Provider store={store}>
            <Router basename={setting.prefix}>
                <Routes></Routes>
            </Router>
        </Provider>
    );
};

export default App;
