import React from 'react';
import Routes from './routes/routes';
<% if(needRedux) { %>import store from './store/store';
import { Provider, useSelector } from 'react-redux';<% } %>
const App = () => {
    return (
        <% if(needRedux) { %><Provider store={store}>
            <Routes></Routes>
        </Provider>
        <% } else { %><Routes></Routes><% } %>
    );
};

export default App;
