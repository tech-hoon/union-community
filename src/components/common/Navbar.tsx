import styled from 'styled-components';
import Aside from '../Home/Aside';
import LogoBox from './LogoBox';

interface Props {
  page: string;
}

const Navbar = ({ page }: Props) => {
  return (
    <Wrapper>
      <LogoBox />
      <Aside page={page} />
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  padding: 10px;
`;

export default Navbar;
