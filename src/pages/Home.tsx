import Navbar from 'components/common/Navbar';
import styled from 'styled-components';

interface Props {}

const Home = (props: Props) => {
  return (
    <Wrapper>
      <Navbar />
      {/* <Back>&#xE001; 뒤로가기</Back> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  background-color: #f8f9fa;
`;

export default Home;
