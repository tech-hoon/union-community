import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import { MainBanner1M, MainBanner1L, MainBanner2M, MainBanner2L } from 'assets/banner';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import './styles.css';

SwiperCore.use([Autoplay, Pagination, Navigation]);

const MainBannerSlider = () => (
  // <Swiper
  //   slidesPerView={1}
  //   autoplay={{
  //     delay: 4000,
  //     disableOnInteraction: false,
  //   }}
  //   observer={true}
  //   observeParents={true}
  //   loop
  //   pagination={{
  //     clickable: true,
  //   }}
  //   navigation={true}
  // >
  //   <SwiperSlide>
  //     <Picture>
  //       <source media='(max-width:768px)' srcSet={MainBanner1M} />
  //       <img src={MainBanner1L} alt='메인 배너1' />
  //     </Picture>
  //   </SwiperSlide>

  //   <SwiperSlide>
  //     <Picture>
  //       <source media='(max-width:768px)' srcSet={MainBanner2M} />
  //       <img src={MainBanner2L} alt='메인 배너2' />
  //     </Picture>
  //   </SwiperSlide>
  // </Swiper>

  <Picture>
    <source media='(max-width:768px)' srcSet={MainBanner1M} />
    <img src={MainBanner1L} alt='메인 배너1' />
  </Picture>
);

const Picture = styled.picture`
  & > * {
    width: 100%;
    max-width: 1680px;
    margin: 0 auto;
  }
`;

export default MainBannerSlider;
