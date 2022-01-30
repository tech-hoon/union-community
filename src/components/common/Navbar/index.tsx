import styled from 'styled-components';
import Aside from './Aside';
import LogoBox from '../LogoBox';
import { memo, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
  option?: 'home' | 'post-detail';
}

const Navbar = ({ children = <Aside />, option = 'home' }: IProps) => {
  const history = useHistory();

  return (
    <Wrapper>
      <Inner>
        {option === 'post-detail' ? (
          <BackButton
            onClick={() =>
              history.push({
                pathname: '/home',
                state: history.location.state,
              })
            }
          >
            &#xE000;
          </BackButton>
        ) : (
          <LogoBox />
        )}
        {children}
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
  max-width: ${({ theme }) => theme.container.maxWidth};
  padding: ${({ theme }) => `12px ${theme.container.paddingLeftRight}`};
  margin: 0 auto;

  @media ${({ theme }) => theme.size.mobile} {
    width: 97%;
    padding: 8px;
  }

  display: flex;
  user-select: none;
  justify-content: space-between;
`;

const BackButton = styled.span`
  font-weight: 700;
  font-size: 2em;
  cursor: pointer;
`;

export default memo(Navbar);
