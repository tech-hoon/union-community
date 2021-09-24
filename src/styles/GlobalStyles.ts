import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
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
    cursor:pointer;
  }
  body{
    font-family: "Spoqa Regular";
    background-color: #f8f9fa;
  }

  input{
    border:none;
    outline:none;
    background:none;
  }
`;

export default GlobalStyle;
