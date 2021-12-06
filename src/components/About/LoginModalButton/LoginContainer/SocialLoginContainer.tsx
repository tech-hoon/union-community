import { memo, useState } from 'react';
import styled from 'styled-components';
import SocialLoginButton from '../../../common/SocialLoginButton';
import { Layouts as S } from '../Layouts';

const SocialLoginContainer = () => {
  const [errorInfo, setErrorInfo] = useState<string>();

  const handleErrorInfo = (msg: string) => {
    setErrorInfo(msg);
  };

  return (
    <S.Container>
      <S.Title>환영합니다!</S.Title>
      {errorInfo ? (
        <ErrorInfo>{errorInfo}</ErrorInfo>
      ) : (
        <S.Subtitle>소셜 계정으로 로그인</S.Subtitle>
      )}
      <S.Body>
        <ButtonBox>
          <SocialLoginButton name='google' handleErrorInfo={handleErrorInfo} />
          <SocialLoginButton name='facebook' handleErrorInfo={handleErrorInfo} />
        </ButtonBox>
      </S.Body>
    </S.Container>
  );
};

const ButtonBox = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
`;

const ErrorInfo = styled.h2`
  font-weight: 500;
  font-size: 1.2rem;
  color: #f77;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1rem;
  }
`;

export default memo(SocialLoginContainer);
