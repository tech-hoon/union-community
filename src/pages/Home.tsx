import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
import PostCardBox from 'components/Home/PostCardBox';
import CategoryBox from 'components/Home/CategoryBox';
import OrderbyBox from 'components/Home/OrderbyBox';
import Footer from 'components/common/Footer';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { useState, useRef, useEffect } from 'react';
import { CARD_AMOUNT } from 'utils/config';
import PostSkeleton from 'components/common/Skeletons/PostSkeleton';
import { useGetPosts } from 'hooks/useGetPosts';
import { ArrowCircleDown } from '@styled-icons/fa-solid';
import SearchBox from 'components/Home/SearchBox';
import { useRecoilState } from 'recoil';
import { postsLastIndex } from 'store/post';

interface Props {}

const Home = (props: Props) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [lastIndex, setLastIndex] = useRecoilState(postsLastIndex);
  const { posts, isLastPost } = useGetPosts();

  const onIndexIncrease = () => setLastIndex((lastIndex) => lastIndex + CARD_AMOUNT);

  const ioRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ioRef, {}, onIndexIncrease);

  useEffect(() => {
    posts && setInitialLoading(false);
  }, [posts]);

  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      <CategoryBox />
      <OrderSearchWrapper>
        <OrderbyBox />
        <SearchBox />
      </OrderSearchWrapper>
      {initialLoading ? <PostSkeleton /> : <PostCardBox posts={posts || []} />}

      {/* <Observer ref={ioRef} /> */}
      {isLastPost ? (
        <Last>글이 없습니다.</Last>
      ) : (
        <PageNextButton onClick={onIndexIncrease}>다음</PageNextButton>
      )}
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Observer = styled.div`
  bottom: 0;
  height: 20px;
`;

const OrderSearchWrapper = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;

  @media ${({ theme }) => theme.size.mobile} {
    width: 95%;
  }
`;

const PageNextButton = styled(ArrowCircleDown)`
  width: 24px;
  color: gray;
  margin-top: 24p;
  margin-left: 50%;

  &:hover {
    align-self: center;
    transform: scale(1.2);
  }
`;

const Last = styled.div`
  margin-top: 24p;
  text-align: center;
  color: gray;
`;

export default Home;
