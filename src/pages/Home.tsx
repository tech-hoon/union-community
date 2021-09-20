import Navbar from 'components/common/Navbar';
import MenuBox from 'components/Home/MenuBox';
import OrderBox from 'components/Home/OrderBox';
import styled from 'styled-components';

interface Props {}

const Home = (props: Props) => {
  return (
    <Wrapper>
      <NavbarWrapper>
        <Navbar />
        <MenuBox />
        <OrderBox />
      </NavbarWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const NavbarWrapper = styled.div``;

export default Home;
