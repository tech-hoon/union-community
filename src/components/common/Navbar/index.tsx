import styled from 'styled-components';
import Aside from './Aside';
import LogoBox from '../LogoBox';
import { memo } from 'react';

interface Props {
  isLoggedIn: boolean;
}

const Navbar = ({ isLoggedIn }: Props) => {
  return (
    <Wrapper>
      <LogoBox />
      <Aside isLoggedIn={isLoggedIn} />
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  padding: 24px;
`;

export default memo(Navbar);
