import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/globals';
import Routes from './routes';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes />
      <GlobalStyle />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
