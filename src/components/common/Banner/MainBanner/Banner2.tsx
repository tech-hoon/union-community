import styled from 'styled-components';
import { Layouts as S } from './Layouts';

const Banner2 = () => {
  return (
    <S.Wrapper>
      <Container>Sample Banner2</Container>
    </S.Wrapper>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  color: white;
  background-color: #219f94;
`;

export default Banner2;
