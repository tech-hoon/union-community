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
      <LogoWrapper>
        <Logo
          src={name === 'google' ? googleImg : facebookImg}
          onClick={onClickSocial}
          name={name}
        />
      </LogoWrapper>
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

const LogoWrapper = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 25px rgb(0 0 0 / 15%);
  border-radius: 20px;
  margin-bottom: 10px;
  cursor: pointer;

  @media ${({ theme }) => theme.size.mobile} {
    width: 150px;
    height: 150px;
    margin-bottom: 6px;
  }
`;

const Logo = styled.img<SocialLoginProps>`
  width: 88px;
  height: 88px;

  @media ${({ theme }) => theme.size.mobile} {
    width: 50px;
    height: 50px;
  }
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
  color: #555;
`;

export default memo(SocialLogin);
