import { useCallback, useRef, useEffect } from 'react';
import { CloseOutline } from '@styled-icons/evaicons-outline';
import styled from 'styled-components';
import Portal from '.';
import LogoImg from '../LogoBox/LogoImg';
import SocialLogin from '../SocialLogin/SocialLogin';

interface Props {
  onClose: () => void;
}

const LoginPortal = ({ onClose }: Props) => {
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
      <Wrapper>
        <LoginContainer ref={portalRef}>
          <Top>
            <LogoImg />
            <CloseBtn onClick={onClose} size='24' color='gray' />
          </Top>
          <Title>환영합니다!</Title>
          <Body>
            <SocialLogin name='google' />
            <SocialLogin name='facebook' />
          </Body>
        </LoginContainer>
      </Wrapper>
    </Portal>
  );
};

const Wrapper = styled.div`
  position: fixed;
  z-index: 1000;
  text-align: center;
  background-color: rgba(145, 145, 145, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const LoginContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  margin: auto;
  background-color: white;
  border-radius: 8px;
`;

const Body = styled.div`
  /* margin: 20% 0; */
  display: flex;
  justify-content: space-around;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f8f9fa;
  padding: 6px;
  border-radius: 8px 8px 0 0;
`;

const CloseBtn = styled(CloseOutline)`
  cursor: pointer;
`;

const Title = styled.h1`
  margin-top: 5%;
  font-family: 'Spoqa Bold';
  font-size: 30px;
`;

export default LoginPortal;
