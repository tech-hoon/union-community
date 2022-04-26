import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  *  {
    box-sizing: border-box;
    font-size:62.5%;
    -webkit-tap-highlight-color:transparent;

    &::-webkit-scrollbar {
    display: none;
    }

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }


  a {
    text-decoration-line:none;
    color:#2883f3;
  }

  ul {
    list-style:none;
  }

  button{
    border:none;
    outline:none;
    background: none;
    padding:0;
    cursor: pointer;
    user-select:none;
  }

  body{
    overflow:auto;
    background-color: #f8f9fa;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';

    /* ios vh issue fix */
    @supports (-webkit-touch-callout: none) {
      height: -webkit-fill-available;
    }
    touch-action: pan-y;
  }

  /* modal opened, prevent scrolling */
  body.modal_opened {
    overflow:hidden;
    touch-action:none;
  }

  input{
    border:none;
    outline:none;
    background:none;
  }

  /* webkit input padding off */
  form input #submit { 
   -webkit-appearance:none;  
   -webkit-border-radius:0px;
   margin:0;  
   padding:0;  
   display:block;
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

  svg > path{
    pointer-events:none;
  }
`;

export default GlobalStyle;
