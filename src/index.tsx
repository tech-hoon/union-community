import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import GlobalStyles from 'styles/GlobalStyles';
import GlobalFonts from 'common/fonts';
import theme from 'styles/theme';
import { ThemeProvider } from 'styled-components';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <GlobalFonts />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
