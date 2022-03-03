import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import GlobalStyles from 'styles/GlobalStyles';
import theme from 'styles/theme';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <RecoilRoot>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
