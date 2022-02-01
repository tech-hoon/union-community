import LoginModalButton from 'components/Main/LoginModalButton';
import { Layouts as S, IProps } from './Layouts';

const Onboarding3 = ({ screenHeight }: IProps) => {
  return (
    <S.Wrapper backgroundColor='CadetBlue'>
      <S.Container>
        <S.Contents>상세 페이지 3(준비중)</S.Contents>
        <S.ButtonWrapper screenHeight={screenHeight}>
          <LoginModalButton />
        </S.ButtonWrapper>
      </S.Container>
    </S.Wrapper>
  );
};

export default Onboarding3;
