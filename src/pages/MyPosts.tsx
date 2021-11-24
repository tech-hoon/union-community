import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
const MyPosts = () => {
  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      <Container>My Posts</Container>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Container = styled.div``;

export default MyPosts;
