import Navbar from 'components/common/Navbar';
import CardBox from 'components/Home/CardBox';
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
        <CardBox />
      </NavbarWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const NavbarWrapper = styled.div``;

export default Home;
