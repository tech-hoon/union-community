import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import MainLogo from 'assets/logo/MainLogo';

interface Props {
  width?: string;
  height?: string;
}

const LogoBox = ({ width, height }: Props) => {
  const history = useHistory();

  const onClick = () => {
    if (history.location.pathname === '/home') {
      window.scroll({ behavior: 'smooth', top: 0 });
      return;
    }
    history.push(`/`);
  };

  return (
    <Wrapper onClick={onClick} width={width} height={height}>
      <MainLogo />
    </Wrapper>
  );
};

const Wrapper = styled.div<Props>`
  display: flex;
  width: ${({ width }) => width || `88px`}}
  height: ${({ height }) => height || `36px`}}
  padding: 0 2px 1px 1px;
  align-items: center;
  cursor: pointer;
`;

export default LogoBox;
