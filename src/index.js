import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/main.css'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import { AppContainer } from 'react-hot-loader';

const serverURL = window.location.host.includes("localhost") ? "http://localhost:4000" : "https://whosbringingwhat.org"

const client = new ApolloClient({
    uri: `${serverURL}/graphql`
});

// import registerServiceWorker from './registerServiceWorker';
const render = () => {
    ReactDOM.render(
    <ApolloProvider client={client}>
        <AppContainer>
            <Provider store={store}>
                <BrowserRouter>    
                    <App />
                </BrowserRouter>
            </Provider>
        </AppContainer>
    </ ApolloProvider>
    , document.getElementById('root'));
    // registerServiceWorker();
}


render(); 

if (module.hot) {
    module.hot.accept('./App', () => {
      render();
    });
  }