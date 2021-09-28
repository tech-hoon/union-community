import { useCallback, useRef, useEffect } from 'react';
import { CloseOutline } from '@styled-icons/evaicons-outline';
import styled from 'styled-components';
import Portal from '..';
import LogoImg from '../../LogoBox/LogoImg';
import LoginContainer from './LoginContainer';
import AuthContainer from './AuthContainer';
import NicknameContainer from './NicknameContainer';

interface Props {
  onClose: () => void;
}

const LoginPortal = ({ onClose }: Props) => {
  let step = 0;
  const onStepNext = () => {};
  const onStepPrev = () => {};
  // TODO: step & recoil 연동

  const CurrentContainer = () => {
    switch (step) {
      case 0:
        return <LoginContainer onStepNext={onStepNext} />;
      case 1:
        return <AuthContainer onStepPrev={onStepPrev} onStepNext={onStepNext} />;
      case 2:
        return <NicknameContainer />;
      default:
        return null;
    }
  };

  const portalRef = useRef<HTMLDivElement>(null);
  const portalClose = useCallback(
    (e) => {
      if (portalRef.current && !portalRef.current.contains(e.target)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('click', portalClose);
    return () => window.removeEventListener('click', portalClose);
  });

  return (
    <Portal>
      <Background>
        <Wrapper ref={portalRef}>
          <Header>
            <LogoImg />
            <CloseBtn onClick={onClose} size='24' color='gray' />
          </Header>
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
  width: 80%;
  margin: auto;
  background-color: white;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f8f9fa;
  padding: 6px;
  border-radius: 8px 8px 0 0;
`;

const CloseBtn = styled(CloseOutline)`
  cursor: pointer;
`;

export default LoginPortal;
