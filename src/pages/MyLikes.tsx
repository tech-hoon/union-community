import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
const MyLikes = () => {
  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      <Container>My Likes</Container>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Container = styled.div``;

export default MyLikes;
