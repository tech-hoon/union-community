import { Layouts as S } from './Layouts';
import { randomInt } from 'utils/random';
import Banner1 from './Banner1';
import Banner2 from './Banner2';
import Banner3 from './Banner3';
import { useEffect, useState } from 'react';

const BottomBanner = () => {
  const [randomNum, setRandomNum] = useState<number>(1);

  useEffect(() => {
    setRandomNum(randomInt(1, MAX));
  }, []);

  return <S.Wrapper>{CurrentBanner(randomNum)}</S.Wrapper>;
};

const MAX = 3;

const CurrentBanner = (num: number) => {
  switch (num) {
    case 1:
      return <Banner1 />;
    case 2:
      return <Banner2 />;
    case 3:
      return <Banner3 />;
    default:
      return <></>;
  }
};

export default BottomBanner;
