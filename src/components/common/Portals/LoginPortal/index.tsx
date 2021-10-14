import { useCallback, useRef, useEffect } from 'react';
import { CloseOutline } from '@styled-icons/evaicons-outline';
import styled from 'styled-components';
import Portal from '..';
import LoginContainer from './LoginContainer';
import ResidentAuthContainer from './ResidentAuthContainer';
import NicknameContainer from './NicknameContainer';
import useLoginStep from 'hooks/useLoginStep';
import LogoBox from 'components/common/LogoBox';
import { authService } from 'service/firebase';

interface Props {
  onClose: () => void;
}

const LoginPortal = ({ onClose }: Props) => {
  const { loginStep, onLoginStepPrev, onLoginStepNext, onLoginStepReset } = useLoginStep();

  const CurrentContainer = () => {
    switch (loginStep) {
      case 1:
        return <LoginContainer />;
      case 2:
        return <ResidentAuthContainer />;
      case 3:
        return <NicknameContainer />;
      default:
        return null;
    }
  };

  const portalRef = useRef<HTMLDivElement>(null);
  const portalClose = useCallback(
    (e) => {
      if ((portalRef.current && !portalRef.current.contains(e.target)) || e.key === 'Escape') {
        onClose();
      }
    },
    [onClose, onLoginStepReset]
  );

  useEffect(() => {
    window.addEventListener('click', portalClose);
    window.addEventListener('keydown', portalClose);

    return () => {
      window.removeEventListener('click', portalClose);
      window.removeEventListener('keydown', portalClose);
    };
  });

  return (
    <Portal>
      <Background>
        <Wrapper ref={portalRef}>
          <Header>
            <LogoBox />
            <CloseBtn onClick={onClose} size='24' color='gray' />
          </Header>
          <Nav>
            {loginStep !== 1 && <BackButton onClick={onLoginStepPrev}>&#xE000;</BackButton>}
          </Nav>
          <CurrentContainer />
        </Wrapper>
      </Background>
    </Portal>
  );
};

const Background = styled.div`
  position: fixed;
  z-index: 1000;
  text-align: center;
  background-color: rgba(145, 145, 145, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 80vh;
  margin: auto;
  background-color: white;
  border-radius: 8px;

  @media ${({ theme }) => theme.size.mobile} {
    width: 100%;
    height: 100vh;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f8f9fa;
  padding: 10px 16px;
  border-radius: 8px 8px 0 0;
`;

const Nav = styled.div`
  height: 10%;
`;

const BackButton = styled.button`
  font-family: 'Spoqa Bold';
  font-size: 32px;
  padding: 16px;
  margin-right: 90%;
  color: gray;
`;

const CloseBtn = styled(CloseOutline)`
  cursor: pointer;
`;

export default LoginPortal;
