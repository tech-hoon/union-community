import styled from 'styled-components';
import logoImg from 'assets/images/logo-image.png';

interface Props {}

const LogoImg = (props: Props) => {
  return <Img src={logoImg} />;
};

const Img = styled.img`
  width: 48px;
  margin-right: 4px;
`;

export default LogoImg;
