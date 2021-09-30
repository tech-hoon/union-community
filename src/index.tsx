import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import GlobalStyles from 'styles/GlobalStyles';
import GlobalFonts from 'common/fonts';
import theme from 'styles/theme';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <GlobalFonts />
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
