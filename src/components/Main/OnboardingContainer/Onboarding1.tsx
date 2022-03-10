import { Layouts as S } from './Layouts';
import ImgSrc from 'assets/images/onboarding/onboarding1.gif';

const Onboarding1 = () => {
  return (
    <S.Wrapper backgroundColor='#DFF2FF'>
      <S.Container>
        <S.Content>
          <p>기숙사에 생필품이 너무 많나요?</p>
          <p>
            <em>유니온</em>을 통해
            <br /> 입주생들과 <b>물물교환</b>을 해보세요!
          </p>
        </S.Content>
        <S.Image src={ImgSrc} />
      </S.Container>
    </S.Wrapper>
  );
};

export default Onboarding1;
