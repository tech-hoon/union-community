import styled from 'styled-components';
import logoImg from 'assets/images/logo-image.png';
import Aside from '../Home/Aside';

interface Props {
  page: string;
}

const Navbar = ({ page }: Props) => {
  return (
    <Wrapper>
      <LogoContainer>
        <Logo src={logoImg} />
        <LogoTitle>대학생 연합기숙사 커뮤니티</LogoTitle>
      </LogoContainer>
      <Aside page={page} />
    </Wrapper>
  );
};

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 3;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 48px;
  margin-right: 4px;
`;

const LogoTitle = styled.h1`
  font-family: 'Spoqa Bold';
  font-size: 1.5em;
  line-height: 40px;
  letter-spacing: -0.04em;

  @media (max-width: 568px) {
    font-size: 1.2em;
  }
`;

const Wrapper = styled.nav`
  display: flex;
  padding: 10px;
`;

export default Navbar;
