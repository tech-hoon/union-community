import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import GlobalStyles from 'styles/GlobalStyles';
import GlobalFonts from 'common/fonts';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <GlobalFonts />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
