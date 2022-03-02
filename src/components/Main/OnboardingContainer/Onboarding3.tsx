import { Layouts as S } from './Layouts';
import ImgSrc from 'assets/images/onboarding/onboarding2.svg';
import styled, { css } from 'styled-components';
import LoginModalButton from 'components/Main/LoginModalButton';
import Fade from 'react-reveal/Fade';

const Onboarding3 = () => {
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
          <ButtonWrapper>
            <Button isSelected={true}>iOS</Button>
            <Button isSelected={false}>Android</Button>
          </ButtonWrapper>
        </ContentWrapper>

        <ImageContainer>
          <ImageWrapper>
            <Caption>1. 임시 텍스트1</Caption>
            <Image src={ImgSrc} alt='iOS 앱 설치 방법 이미지 1' />
          </ImageWrapper>
          <ImageWrapper>
            <Caption>2. 임시 텍스트1</Caption>
            <Image src={ImgSrc} alt='iOS 앱 설치 방법 이미지 2' />
          </ImageWrapper>
          <ImageWrapper>
            <Caption>3. 임시 텍스트3</Caption>
            <Image src={ImgSrc} alt='iOS 앱 설치 방법 이미지 3' />
          </ImageWrapper>
        </ImageContainer>
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

  @media ${({ theme }) => theme.size.mobile} {
    justify-content: auto;
    gap: 20px;
  }
`;

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
`;

export default Onboarding3;
