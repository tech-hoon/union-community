import { memo, useState } from 'react';
import styled from 'styled-components';
import googleImg from 'assets/images/logo/google-logo.png';
import facebookImg from 'assets/images/logo/facebook-logo.png';
import { firebaseApp, authService } from 'service/firebase';

interface SocialLoginProps {
  name: string;
  handleErrorInfo: (msg: string) => void;
}

const SocialLoginButton = ({ name, handleErrorInfo }: SocialLoginProps) => {
  const onClickSocial: React.MouseEventHandler<HTMLImageElement> = async () => {
    try {
      const provider =
        name === 'google'
          ? new firebaseApp.auth.GoogleAuthProvider()
          : new firebaseApp.auth.FacebookAuthProvider();

      await authService.signInWithPopup(provider);
    } catch (error: any) {
      const code = error.code;

      switch (code) {
        case 'auth/account-exists-with-different-credential':
          handleErrorInfo('*이미 가입된 소셜계정이 있습니다.');
          break;
        default:
          handleErrorInfo('*에러가 발생하였습니다.');
      }
    }
  };

  return (
    <Wrapper>
      <LogoWrapper onClick={onClickSocial}>
        <Logo src={name === 'google' ? googleImg : facebookImg} name={name} />
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
  gap: 16px;
`;

const LogoWrapper = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 25px rgb(0 0 0 / 15%);
  border-radius: 20px;
  cursor: pointer;

  @media ${({ theme }) => theme.size.mobile} {
    width: 140px;
    height: 140px;
  }

  @media ${({ theme }) => theme.size.mobileS} {
    width: 120px;
    height: 120px;
  }
`;

interface ILogo {
  name: string;
}

const Logo = styled.img<ILogo>`
  width: 88px;
  height: 88px;

  @media ${({ theme }) => theme.size.mobile} {
    width: 60px;
    height: 60px;
  }

  @media ${({ theme }) => theme.size.mobileS} {
    width: 50px;
    height: 50px;
  }
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
  color: #555;
`;

export default memo(SocialLoginButton);
