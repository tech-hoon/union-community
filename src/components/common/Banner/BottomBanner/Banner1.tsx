import styled from 'styled-components';
import { Layouts as S } from '../Layouts';

const Banner1 = () => {
  return (
    <S.Wrapper>
      <Container>Banner1</Container>
    </S.Wrapper>
  );
};

const Container = styled.div`
  height: 200px;
  background-color: pink;
`;

export default Banner1;
