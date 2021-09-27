import React from 'react';
import styled from 'styled-components';
import { firebaseApp, authService } from 'service/firebase';

interface SocialLoginProps {
  name: string;
}

const SocialLogin = ({ name }: SocialLoginProps) => {
  const onSocialClick: React.MouseEventHandler<HTMLButtonElement> = async (event: any) => {
    const {
      target: { name },
    } = event;

    let provider;
    if (name === 'google') {
      provider = new firebaseApp.auth.GoogleAuthProvider();
    } else {
      provider = new firebaseApp.auth.FacebookAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <Wrapper>
      <Logo onClick={onSocialClick} name={name} />
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
  border: 1px solid black;
`;

const Logo = styled.button<SocialLoginProps>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: magenta;
`;

const Title = styled.span``;

export default SocialLogin;
