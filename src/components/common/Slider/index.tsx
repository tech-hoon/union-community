import { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import './styles.css';

interface IProps {
  children: ReactNode[];
}

SwiperCore.use([Autoplay, Pagination, Navigation]);

const Slider = ({ children }: IProps) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      centeredSlides={true}
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

export default Slider;
