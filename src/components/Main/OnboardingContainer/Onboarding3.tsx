import { Layouts as S } from './Layouts';
import styled, { css } from 'styled-components';
import LoginModalButton from 'components/Main/LoginModalButton';
import Fade from 'react-reveal/Fade';
import withReveal from 'react-reveal/withReveal';

import {
  IosImageSrc1,
  IosImageSrc2,
  IosImageSrc3,
  AndroidImageSrc1,
  AndroidImageSrc2,
  AndroidImageSrc3,
} from '.';
import { useCallback, useState } from 'react';

const Onboarding3 = () => {
  const [selectedOS, setSelectedOS] = useState<'iOS' | 'android'>('iOS');

  const onClickButton = useCallback(
    (e) => {
      setSelectedOS(e.target.dataset.id);
    },
    [selectedOS]
  );

  return (
    <S.Wrapper backgroundColor='linear-gradient(180deg, #DFF2FF 50%, #F8F9FA 50%)'>
      <Container>
        <ContentWrapper>
          <S.Content>
            <p>
              <em>유니온</em>을 <b>APP</b>으로도
            </p>
            <p>편리하게 즐길 수 있어요!</p>
          </S.Content>
          <ButtonWrapper onClick={onClickButton}>
            <Button data-id='iOS' isSelected={selectedOS === 'iOS'}>
              iOS
            </Button>
            <Button data-id='android' isSelected={selectedOS === 'android'}>
              Android
            </Button>
          </ButtonWrapper>
        </ContentWrapper>

        {selectedOS === 'iOS' ? (
          <IOSImageContainer>
            <ImageWrapper>
              <Caption>1. 하단 공유버튼 클릭</Caption>
              <Image src={IosImageSrc1} alt='iOS 앱 설치 방법 이미지 1' />
            </ImageWrapper>
            <ImageWrapper>
              <Caption>2. "홈 화면에 추가" 클릭</Caption>
              <Image src={IosImageSrc2} alt='iOS 앱 설치 방법 이미지 2' />
            </ImageWrapper>
            <ImageWrapper>
              <Caption>3. 추가 버튼 클릭</Caption>
              <Image src={IosImageSrc3} alt='iOS 앱 설치 방법 이미지 3' />
            </ImageWrapper>
          </IOSImageContainer>
        ) : (
          <AndroidImageContainer>
            <ImageWrapper>
              <Caption>1. Chrome 앱 실행</Caption>
              <Image src={AndroidImageSrc1} alt='android 앱 설치 방법 이미지 1' />
            </ImageWrapper>
            <ImageWrapper>
              <Caption>2. 설치 배너 클릭</Caption>
              <Image src={AndroidImageSrc2} alt='android 앱 설치 방법 이미지 2' />
            </ImageWrapper>
            <ImageWrapper>
              <Caption>3. 설치 버튼 클릭</Caption>
              <Image src={AndroidImageSrc3} alt='android 앱 설치 방법 이미지 3' />
            </ImageWrapper>
          </AndroidImageContainer>
        )}
        <LoginModalButton />
      </Container>
    </S.Wrapper>
  );
};

const Container = styled(S.Container)`
  flex-direction: column;

  @media ${({ theme }) => theme.size.mobile} {
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;

  @media ${({ theme }) => theme.size.mobile} {
    width: 100%;
    flex-direction: column;
    gap: 20px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ isSelected: boolean }>`
  font-weight: 700;
  font-size: clamp(1rem, 1.2vw, 1.4rem);
  border-radius: 100px;
  width: 120px;
  padding: 6px 12px;
  flex: none;

  ${({ isSelected, theme }) =>
    isSelected
      ? css`
          background-color: ${theme.color.main};
          border: 1px solid ${theme.color.main};
          color: white;
        `
      : css`
          background-color: transparent;
          border: 1px solid ${theme.color.main};
          color: ${theme.color.main};
        `}
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  padding: 0 10%;
  gap: 20px;

  @media ${({ theme }) => theme.size.mobile} {
    padding: 0 0 0 10%;
  }
`;

const AndroidImageContainer = styled(ImageContainer)``;
const IOSImageContainer = styled(ImageContainer)``;

const ImageWrapper = styled.figure`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Caption = styled.figcaption`
  color: ${({ theme }) => theme.color.main};

  font-weight: 500;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  text-align: center;
  letter-spacing: -0.05em;
`;

const Image = styled.img`
  height: 50vh;
  -webkit-user-drag: none;
  user-drag: none;
`;

export default Onboarding3;
