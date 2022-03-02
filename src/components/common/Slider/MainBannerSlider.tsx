import styled from 'styled-components';

import { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import { MainBanner1M, MainBanner1L, MainBanner2M, MainBanner2L } from 'assets/banner';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import './styles.css';

interface IProps {
  children: ReactNode[];
}

const Slider = ({ children }: IProps) => {
  return (
    <Swiper
      slidesPerView={1}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop
      pagination={{
        clickable: true,
      }}
      navigation={true}
    >
      {children.map((child, key) => (
        <SwiperSlide key={key}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

SwiperCore.use([Autoplay, Pagination, Navigation]);

interface IProps {
  children: ReactNode[];
}

const MainBannerSlider = () => {
  return (
    <Slider>
      <Swiper>
        <Picture>
          <source media='(max-width:768px)' srcSet={MainBanner1M} />
          <img src={MainBanner1L} alt='메인 배너1' />
        </Picture>
      </Swiper>

      <Swiper>
        <Picture>
          <source media='(max-width:768px)' srcSet={MainBanner2M} />
          <img src={MainBanner2L} alt='메인 배너2' />
        </Picture>
      </Swiper>
    </Slider>
  );
};

const Picture = styled.picture`
  & > * {
    width: 100%;
    max-width: 1680px;
    margin: 0 auto;
  }
`;

export default MainBannerSlider;
