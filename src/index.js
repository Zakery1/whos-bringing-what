import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/main.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import { AppContainer } from 'react-hot-loader';
// import registerServiceWorker from './registerServiceWorker';
const render = () => {
    ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <BrowserRouter>    
                <App />
            </BrowserRouter>
        </Provider>
    </AppContainer>
    , document.getElementById('root'));
    // registerServiceWorker();
}


render(); 

if (module.hot) {
    module.hot.accept('./App', () => {
      render();
    });
  }