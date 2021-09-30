import React from 'react';
import styled from 'styled-components';
import googleImg from 'assets/images/logo/google-logo.png';
import facebookImg from 'assets/images/logo/facebook-logo.png';
import useLoginStep from 'hooks/useLoginStep';
import { firebaseApp, authService } from 'service/firebase';

interface SocialLoginProps {
  name: string;
}

const SocialLogin = ({ name }: SocialLoginProps) => {
  const { onStepNext } = useLoginStep();
  /* TODO:
    가입 안 되어 있으면, 바로 로그인 X
    가입 되어 있으면 바로 로그인 & login step reset
  */

  const onSocialClick: React.MouseEventHandler<HTMLImageElement> = async (event: any) => {
    const {
      target: { name },
    } = event;

    let provider;

    try {
      provider =
        name === 'google'
          ? new firebaseApp.auth.GoogleAuthProvider()
          : new firebaseApp.auth.FacebookAuthProvider();

      const data = await authService.signInWithPopup(provider);
      console.log(data);
      onStepNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Logo src={name === 'google' ? googleImg : facebookImg} onClick={onSocialClick} name={name} />
      <Title>{name}</Title>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0px;
  gap: 12px;
`;

const Logo = styled.img<SocialLoginProps>`
  width: 150px;
  height: 150px;
  margin-bottom: 16px;
`;

const Title = styled.span`
  font-family: 'Spoqa Medium';
  font-size: 20px;
`;

export default SocialLogin;
