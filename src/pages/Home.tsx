import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
import PostCardBox from 'components/Home/PostCardBox';
import CategoryBox from 'components/Home/CategoryBox';
import OrderbyBox from 'components/Home/OrderbyBox';
import Footer from 'components/common/Footer';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { useState, useRef, useEffect } from 'react';
import { FIRST_INDEX, CARD_AMOUNT } from 'utils/config';
import PostSkeleton from 'components/common/Skeletons/PostSkeleton';
import { useGetPosts } from 'hooks/usePosts';
import { ArrowCircleDown } from '@styled-icons/fa-solid';

interface Props {}

const Home = (props: Props) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [lastIndex, setLastIndex] = useState(FIRST_INDEX);
  const { posts } = useGetPosts({ lastIndex });

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
      <OrderbyBox />
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

const PageNextButton = styled(ArrowCircleDown)`
  width: 24px;
  color: gray;
  margin-left: 50%;

  &:hover {
    align-self: center;
    transform: scale(1.2);
  }
`;

export default Home;
