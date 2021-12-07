import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  *  {
    box-sizing: border-box;
    font-size:62.5%;
  }
  a {
    color:#333
  }
  ul {
    list-style:none;
  }
  button{
    border:none;
    outline:none;
    background: none;
    cursor: pointer;
  }
  body{
    background-color: #f8f9fa;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    height:100vh;

    /* ios vh issue fix */
    @supports (-webkit-touch-callout: none) {
      height: -webkit-fill-available;
    }
  }

  input{
    border:none;
    outline:none;
    background:none;
  }

  textarea{
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  }

  /* ios select style reset */
  select {
    -webkit-appearance: none;
    -moz-appearance: none; 
    appearance: none;
  }

  touch-action: pan-y;
`;

export default GlobalStyle;
