import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
import PostCardBox from 'components/Home/PostCardBox';
import MenuBox from 'components/Home/MenuBox';
import OrderBox from 'components/Home/OrderBox';
import Footer from 'components/common/Footer';
import CardSkeleton from 'components/common/Skeletons/CardSkeleton';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { useState, useRef } from 'react';
import { FIRST_INDEX, CARD_AMOUNT } from 'utils/config';
import useGetPosts from 'hooks/useGetPosts';

interface Props {}

const Home = (props: Props) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [lastIndex, setLastIndex] = useState(FIRST_INDEX);
  const { posts } = useGetPosts({ lastIndex, callback: () => setInitialLoading(false) });

  const ioRef = useRef<HTMLDivElement | null>(null);
  const onIndexIncrease = () => setLastIndex((lastIndex) => lastIndex + CARD_AMOUNT);
  const entry = useIntersectionObserver(ioRef, {}, onIndexIncrease);

  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      <MenuBox />
      <OrderBox />
      {initialLoading ? <CardSkeleton /> : <PostCardBox posts={posts || []} />}
      <Observer ref={ioRef} />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Observer = styled.div`
  bottom: 0;
  height: 20px;
`;

export default Home;
