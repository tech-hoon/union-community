import styled from 'styled-components';
import logoImg from 'assets/images/logo-image.png';
import Aside from './Aside';

interface Props {}

const Navbar = (props: Props) => {
  return (
    <Wrapper>
      <LogoContainer>
        <Logo src={logoImg} />
        <LogoTitle>대학생 연합기숙사 커뮤니티</LogoTitle>
      </LogoContainer>
      <Aside />
    </Wrapper>
  );
};

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 3;
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

  @media ${({ theme }) => theme.size.mobile} {
    display: none;
  }
`;

const Wrapper = styled.nav`
  display: flex;
  padding: 10px;
`;

export default Navbar;
