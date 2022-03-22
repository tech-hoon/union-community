import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { getUserPostCount } from 'api/count';
import useLocalStorage from 'hooks/common/useLocalStorage';

const TopBanner = () => {
  const [count, setCount] = useState();
  const [topBannerOpened, setTopBannerOpened] = useLocalStorage('top_banner_opened', false);
  const [topBannerOpenedDate, setTopBannerOpenedDate] = useLocalStorage(
    'top_banner_opened_date',
    null
  );

  const onTopBannerClick = useCallback(() => {
    setTopBannerOpened(false);
  }, [topBannerOpened]);

  const fetchCount = async () => {
    const data = await getUserPostCount();
    setCount(data.user);
  };

  useLayoutEffect(() => {
    const currentDate = new Date().getDate();
    if (topBannerOpenedDate !== currentDate) {
      fetchCount();
      setTopBannerOpened(true);
      setTopBannerOpenedDate(currentDate);
      return;
    }

    setTopBannerOpened(false);
  }, []);

  return (
    topBannerOpened &&
    !!count && (
      <TopCountBanner>
        <p>
          현재 <strong>{count}</strong>명의 기숙사생이 사용하고 있어요 !
        </p>

        <BannerCloseButton onClick={onTopBannerClick}>
          <CloseIcon />
        </BannerCloseButton>
      </TopCountBanner>
    )
  );
};

const TopCountBanner = styled.div`
  width: 100%;
  height: 36px;
  background-color: #f5f5b5;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 14px;
  font-weight: 300;
  margin-top: -36px;

  & strong {
    font-weight: bold;
    color: ${({ theme }) => theme.color.main};
  }

  animation: popUpAnimation 0.5s ease 1s 1 normal forwards running;
  @keyframes popUpAnimation {
    0% {
      margin-top: -36px;
    }

    100% {
      margin-top: 0px;
    }
  }
`;

const BannerCloseButton = styled.button`
  position: absolute;
  top: 50%;
  height: 36px;
  right: 20px;
  margin-top: -17px;
`;

const CloseIcon = () => (
  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <line x1='4.72408' y1='14.7246' x2='14.4174' y2='5.03121' stroke='black' />
    <line x1='14.4521' y1='14.9346' x2='4.75875' y2='5.24125' stroke='black' />
  </svg>
);

export default TopBanner;
