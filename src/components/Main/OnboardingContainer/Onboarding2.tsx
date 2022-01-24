import { Layouts as S, IProps } from './Layouts';

const DetailContainer2 = ({ onClick, screenHeight }: IProps) => {
  return (
    <S.Wrapper backgroundColor='orange'>
      <S.Container>
        <S.Contents>상세 페이지 2(준비중)</S.Contents>
        <S.ButtonWrapper screenHeight={screenHeight}>
          <S.ScrollDownButton onClick={onClick} data-page-id={3} />
        </S.ButtonWrapper>
      </S.Container>
    </S.Wrapper>
  );
};

export default DetailContainer2;
