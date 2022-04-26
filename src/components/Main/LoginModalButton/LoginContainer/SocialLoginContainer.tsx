import { memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { webviewCheck } from 'utils/mobileCheck';
import SocialLoginButton from '../../../common/SocialLoginButton';
import { Layouts as S } from '../Layouts';
import SamsungSrc from 'assets/logo/Samsung_browser_logo.png';
import SafariSrc from 'assets/logo/Safari_browser_logo.png';
import ChromeSrc from 'assets/logo/Chrome_browser_logo.png';

const SocialLoginContainer = () => {
  const [errorInfo, setErrorInfo] = useState<string>();
  const [webviewType, _] = useState(webviewCheck());

  const handleErrorInfo = (msg: string) => {
    setErrorInfo(msg);
  };

  return webviewType ? (
    <S.Container>
      <S.Title>⚠️ 죄송합니다</S.Title>
      <S.Subtitle>지원하지 않는 브라우저입니다. ({webviewType})</S.Subtitle>
      <S.Body>
        <ImageBox>
          <Image src={SafariSrc} />
          <Image src={SamsungSrc} />
          <Image src={ChromeSrc} />
        </ImageBox>
        <Content>
          <em>Safari, 삼성 인터넷, Chrome</em>
          <br />등 앱에서 접속해주세요.
        </Content>
      </S.Body>
    </S.Container>
  ) : (
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

const Content = styled(S.Subtitle)`
  font-size: 1rem;
  line-height: 2;
  color: #666;
  margin-top: 32px;

  & em {
    font-weight: bold;
    color: ${({ theme }) => theme.color.main};
  }
`;

const ImageBox = styled.div`
  display: flex;
  gap: 20px;
`;
const Image = styled.img`
  width: 60px;
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
