import LoginModalButton from 'components/About/LoginModalButton';
import styled from 'styled-components';

const DetailContainer3 = () => {
  return (
    <Wrapper>
      <Container>
        <Contents>상세 페이지 3</Contents>
        <LoginModalButton />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  flex: none;
  background-color: CadetBlue;
  scroll-snap-align: start;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5% 0;
`;

const Contents = styled.article`
  flex: 1;
`;
export default DetailContainer3;
