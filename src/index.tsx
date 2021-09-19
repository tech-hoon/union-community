import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import GlobalStyle from 'styles/GlobalStyles';
import GlobalFonts from 'common/fonts';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalFonts />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
