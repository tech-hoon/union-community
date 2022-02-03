import Slider from 'components/common/Slider';
import { MainBanner, Banner2, Banner3 } from '../Banner/MainBanner';

const MainBannerSlider = () => {
  return (
    <Slider>
      <MainBanner />
      <Banner2 />
      <Banner3 />
    </Slider>
  );
};

export default MainBannerSlider;
