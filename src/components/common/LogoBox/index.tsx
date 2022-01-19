import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import MainLogo from 'assets/logo/MainLogo';

interface Props {}

const LogoBox = (props: Props) => {
  const history = useHistory();

  const onClick = () => {
    if (history.location.pathname === '/home') {
      window.scroll({ behavior: 'smooth', top: 0 });
      return;
    }
    history.push(`/`);
  };

  return (
    <Wrapper onClick={onClick}>
      <MainLogo />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 88px;
  height: 36px;
  padding: 0 2px 1px 1px;
  align-items: center;
  cursor: pointer;
`;

export default LogoBox;
