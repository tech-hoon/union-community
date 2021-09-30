import styled from 'styled-components';
import logoImg from 'assets/images/logo/site-logo.png';

const LogoImg = () => {
  return <Img src={logoImg} />;
};

const Img = styled.img`
  width: 2.5em;
  margin-right: 4px;
`;

export default LogoImg;
