import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
import PostCardBox from 'components/Home/PostCardBox';
import CategoryBox from 'components/Home/CategoryBox';
import OrderBox from 'components/Home/OrderBox';
import Footer from 'components/common/Footer';
import CardSkeleton from 'components/common/Skeletons/CardSkeleton';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { useState, useRef, useEffect } from 'react';
import { FIRST_INDEX, CARD_AMOUNT } from 'utils/config';
import { useGetPosts } from 'hooks/usePost';
import PostSkeleton from 'components/common/Skeletons/PostSkeleton';

interface Props {}

const Home = (props: Props) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [lastIndex, setLastIndex] = useState(FIRST_INDEX);
  const { posts } = useGetPosts({
    lastIndex,
  });

  const onIndexIncrease = () => setLastIndex((lastIndex) => lastIndex + CARD_AMOUNT);

  const ioRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ioRef, {}, onIndexIncrease);

  useEffect(() => {
    setInitialLoading(false);
  }, [posts]);

  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      <CategoryBox />
      <OrderBox />
      {initialLoading ? <PostSkeleton /> : <PostCardBox posts={posts || []} />}

      {/* <Observer ref={ioRef} /> */}
      <PageNextButton onClick={onIndexIncrease}>다음</PageNextButton>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Observer = styled.div`
  bottom: 0;
  height: 20px;
`;

const PageNextButton = styled.button`
  margin: 0 auto;
`;

export default Home;
