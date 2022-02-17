import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import { useState } from 'react';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import './styles.css';
import styled from 'styled-components';

SwiperCore.use([Navigation, Thumbs]);

interface IProps {
  imageUrls: string[];
  startIndex: number;
}

const ImageSlider = ({ imageUrls, startIndex }: IProps) => {
  // const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Wrapper>
      {/* <Swiper
        initialSlide={startIndex}
        loop={true}
        spaceBetween={10}
        // thumbs={{ swiper: thumbsSwiper }}
      >
        {imageUrls.map((url, key) => (
          <SwiperSlide key={key}>
            <Img src={url} alt={`첨부 파일-${key + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper> */}

      {imageUrls.map((url, key) => (
        <Img src={url} alt={`첨부 파일-${key + 1}`} key={key} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90vw;
  overflow-x: auto;
  display: flex;
  scroll-snap-type: x mandatory;

  margin: 0 auto;
  gap: 10px;
`;

const Slide = styled.div``;

const Img = styled.img`
  min-height: 100px;
  max-width: 90vw;
  max-height: 200px;
  object-fit: contain;
  scroll-snap-align: center;
`;

export default ImageSlider;
