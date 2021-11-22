import { memo } from 'react';
import styled from 'styled-components';
import googleImg from 'assets/images/logo/google-logo.png';
import facebookImg from 'assets/images/logo/facebook-logo.png';
import { firebaseApp, authService } from 'service/firebase';

interface SocialLoginProps {
  name: string;
}

const SocialLogin = ({ name }: SocialLoginProps) => {
  const onClickSocial: React.MouseEventHandler<HTMLImageElement> = async (event: any) => {
    const {
      target: { name },
    } = event;

    let provider;
    try {
      provider =
        name === 'google'
          ? new firebaseApp.auth.GoogleAuthProvider()
          : new firebaseApp.auth.FacebookAuthProvider();

      authService.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Logo src={name === 'google' ? googleImg : facebookImg} onClick={onClickSocial} name={name} />
      <Title>{name}</Title>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
  font-weight: 500;
  font-size: 20px;
`;

export default memo(SocialLogin);
