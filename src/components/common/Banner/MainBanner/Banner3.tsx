import styled from 'styled-components';
import { Layouts as S } from './Layouts';

const Banner3 = () => {
  return (
    <S.Wrapper>
      <Container>Sample Banner3</Container>
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
  background-color: #c1deae;
`;

export default Banner3;
