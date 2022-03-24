import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import {
  MainBanner1M,
  MainBanner1L,
  MainBanner2M,
  MainBanner2L,
  MainBanner3M,
  MainBanner3L,
} from 'assets/banner';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import './styles.css';
import { useHistory } from 'react-router-dom';

SwiperCore.use([Autoplay, Pagination, Navigation]);

const MainBannerSlider = () => {
  const history = useHistory();

  const onClickBanner: React.MouseEventHandler<HTMLElement> = (e) => {
    const path = (e.target as HTMLElement).dataset.id;
    path && history.push(`/posts/${path}`);
  };

  return (
    <Swiper
      slidesPerView={1}
      autoplay={{
        delay: 3800,
        disableOnInteraction: false,
      }}
      observer={true}
      observeParents={true}
      loop
      pagination={{
        clickable: true,
      }}
      navigation={true}
    >
      <SwiperSlide onClick={onClickBanner}>
        <Picture>
          <source media='(max-width:768px)' srcSet={MainBanner3M} />
          <img src={MainBanner3L} alt='메인 배너3' data-id={`mxTPUcchv77LlWXtrSpZ`} />
        </Picture>
      </SwiperSlide>

      <SwiperSlide onClick={onClickBanner}>
        <Picture>
          <source media='(max-width:768px)' srcSet={MainBanner2M} />
          <img src={MainBanner2L} alt='메인 배너2' data-id={`XhUnOsJrh7FR95CtFXuM`} />
        </Picture>
      </SwiperSlide>

      <SwiperSlide onClick={onClickBanner}>
        <Picture>
          <source media='(max-width:768px)' srcSet={MainBanner1M} />
          <img src={MainBanner1L} alt='메인 배너1' data-id={`HqfwQwVCMqAinR6aIGzi`} />
        </Picture>
      </SwiperSlide>
    </Swiper>
  );
};

const Picture = styled.picture`
  & > *:not(div) {
    width: 100%;
    max-width: 1680px;
    margin: 0 auto;
    cursor: pointer;
    user-drag: none;
    -webkit-user-drag: none;
  }
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: 500;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  color: ${({ theme }) => theme.color.main};
`;

export default MainBannerSlider;
