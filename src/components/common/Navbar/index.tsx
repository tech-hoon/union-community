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
      <Inner>
        <LogoBox />
        <Aside isLoggedIn={isLoggedIn} />
      </Inner>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #f8f9fa;
  position: sticky;
  top: 0px;
  z-index: 9999;
  border-bottom: 1px solid #ededed;
`;

const Inner = styled.nav`
  max-width: 1120px;
  padding: 12px 60px;

  display: flex;
  user-select: none;
  justify-content: space-between;

  @media ${({ theme }) => theme.size.mobile} {
    width: 95%;
    padding: 12px 0;
  }
  margin: 0 auto;
`;

export default memo(Navbar);
