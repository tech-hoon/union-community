// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Navigation, Thumbs } from 'swiper';
// import { useState } from 'react';

// import 'swiper/swiper-bundle.min.css';
// import 'swiper/swiper.min.css';
// import 'swiper/components/navigation/navigation.min.css';
// import 'swiper/components/pagination/pagination.min.css';
// import './styles.css';
// SwiperCore.use([Navigation, Thumbs]);

import styled from 'styled-components';
interface IProps {
  imageUrls: string[];
  startIndex: number;
}

const ImageSlider = ({ imageUrls, startIndex }: IProps) => {
  // const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Wrapper imageAmount={imageUrls.length}>
      {/* <Swiper
        initialSlide={startIndex}
        loop={true}
        spaceBetween={10}
        // thumbs={{ swiper: thumbsSwiper }}
      >
        {imageUrls.map((url, key) => (
          <SwiperSlide key={key}>
            <Image src={url} alt={`첨부 파일-${key + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper> */}

      {imageUrls.map((url, key) => (
        <Image src={url} alt={`첨부 파일-${key + 1}`} key={key} imageAmount={imageUrls.length} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ imageAmount: number }>`
  width: ${({ imageAmount }) => (imageAmount === 1 ? '100%' : '90vw')};
  overflow-x: auto;
  display: flex;
  scroll-snap-type: x mandatory;

  margin: 0 auto;
  gap: 10px;
`;

const Slide = styled.div``;

const Image = styled.img<{ imageAmount: number }>`
  max-width: ${({ imageAmount }) => (imageAmount === 1 ? '70vw' : '90vw')};
  max-height: ${({ imageAmount }) => (imageAmount === 1 ? '70vh' : '220px')};

  object-fit: contain;
  scroll-snap-align: center;
`;

export default ImageSlider;
