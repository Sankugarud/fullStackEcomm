import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Font from 'react-font'

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
};

const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap your entire application with createRoot
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <Font  family='Roboto' weight={500}>
            <App />
          </Font >
        </AlertProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

