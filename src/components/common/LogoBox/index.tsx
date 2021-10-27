import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import MainLogo from 'assets/mainLogo/MainLogo';

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
  width: 100px;
  align-items: center;
  cursor: pointer;

  @media ${({ theme }) => theme.size.mobileS} {
    width: 80px;
  }
`;

export default LogoBox;
