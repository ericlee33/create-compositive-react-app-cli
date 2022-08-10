import React from 'react';
import Routes from './routes/routes';
<% if(needRedux) { %>import store from './store/store';
import { Provider } from 'react-redux';<% } %>
const App = () => {
  <% if(needRedux) { %>return (
    <Provider store={store}>
      <Routes></Routes>
    </Provider>
  );<% } else { %>return <Routes></Routes>;<% } %>
};

export default App;
