import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import MainLogo from 'assets/logo/MainLogo';

interface Props {}

const LogoBox = (props: Props) => {
  const history = useHistory();

  return (
    <Wrapper onClick={() => history.push(`/`)}>
      <MainLogo />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 88px;
  height: 30px;
  padding: 0 2px 1px 1px;
  align-items: center;
  cursor: pointer;

  @media ${({ theme }) => theme.size.mobileS} {
    width: 68px;
  }
`;

export default LogoBox;
