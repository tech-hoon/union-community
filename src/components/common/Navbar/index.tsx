import styled from 'styled-components';
import Aside from './Aside';
import LogoBox from '../LogoBox';
import { memo } from 'react';

interface Props {
  isLoggedIn?: boolean;
}

const Navbar = ({ isLoggedIn = true }: Props) => {
  return (
    <Wrapper>
      <Inner>
        <LogoBox />
        {isLoggedIn && <Aside />}
      </Inner>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #f8f9fa;
  position: sticky;
  top: 0px;
  z-index: 111;
  border-bottom: 1px solid #ededed;
`;

const Inner = styled.nav`
  max-width: 1440px;
  padding: 12px 60px;
  margin: 0 auto;

  @media ${({ theme }) => theme.size.mobile} {
    width: 97%;
    padding: 8px;
  }

  display: flex;
  user-select: none;
  justify-content: space-between;
`;

export default memo(Navbar);
