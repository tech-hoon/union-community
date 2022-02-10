import Slider from 'components/common/Slider';
import styled from 'styled-components';
import { MainBanner, Banner2, Banner3 } from '../Banner/MainBanner';

const MainBannerSlider = () => {
  return (
    <Wrapper>
      <Slider>
        <MainBanner />
        <Banner2 />
        <Banner3 />
      </Slider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 360px;

  @media ${({ theme }) => theme.size.mobile} {
    height: 260px;
  }
`;

export default MainBannerSlider;
