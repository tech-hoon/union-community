import styled from 'styled-components';

const DetailContainer1 = () => {
  const onClick = () => {
    window.scroll({ behavior: 'smooth', top: window.scrollY + window.innerHeight });
  };

  return (
    <Wrapper>
      <Container>
        <Contents>상세 페이지 1</Contents>
        <ScrollDownButton onClick={onClick} />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  flex: none;
  background-color: orange;
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

const ScrollDownButton = styled.button`
  &:before {
    font-size: 3rem;
    content: '⌄';
  }
`;

export default DetailContainer1;
