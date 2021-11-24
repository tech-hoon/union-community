import styled from 'styled-components';
import Navbar from 'components/common/Navbar';

const Setting = () => {
  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      <Container>Setting</Container>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Container = styled.div``;

export default Setting;
