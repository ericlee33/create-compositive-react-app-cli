import React from 'react';
import Routes from './routes/routes';
import store from './store/store';
import { Provider, useSelector } from 'react-redux';

const App = () => {
    return (
        <Provider store={store}>
            <Routes></Routes>
        </Provider>
    );
};

export default App;
