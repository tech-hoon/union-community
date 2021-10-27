import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
import PostCardBox from 'components/Home/PostCardBox';
import CategoryBox from 'components/Home/CategoryBox';
import OrderbyBox from 'components/Home/OrderbyBox';
import Footer from 'components/common/Footer';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { useState, useRef, useEffect } from 'react';
import { CARD_AMOUNT } from 'utils/config';
import CardSkeleton from 'components/common/Skeletons/CardSkeleton';
import { useGetPosts } from 'hooks/useGetPosts';
import { ArrowCircleDown } from '@styled-icons/fa-solid';
import SearchBox from 'components/Home/SearchBox';
import { useRecoilState } from 'recoil';
import { postsLastIndex } from 'store/post';
import { Refresh } from '@styled-icons/foundation';

interface Props {}

const Home = (props: Props) => {
  const { posts, fetchPosts, isLoading, isLastPost } = useGetPosts();
  const [lastIndex, setLastIndex] = useRecoilState(postsLastIndex);
  const [refreshClicked, setRefreshClicked] = useState(false);

  const onIndexIncrease = () => setLastIndex((lastIndex) => lastIndex + CARD_AMOUNT);
  const onRefreshClick = () => {
    fetchPosts();
    setRefreshClicked(!refreshClicked);
  };

  const ioRef = useRef<HTMLDivElement | null>(null);
  // const entry = useIntersectionObserver(ioRef, {}, onIndexIncrease);

  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      <CategoryBox />
      <MidWrapper>
        <OrderbyBox />
        <RefreshButton onClick={onRefreshClick} refreshClicked={refreshClicked}>
          <Refresh />
        </RefreshButton>
        <SearchBox />
      </MidWrapper>
      {isLoading ? <CardSkeleton /> : <PostCardBox posts={posts || []} />}
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

const MidWrapper = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;

  @media ${({ theme }) => theme.size.mobile} {
    width: 95%;
  }
`;

interface IRefreshButton {
  refreshClicked: boolean;
}

const RefreshButton = styled.button<IRefreshButton>`
  color: gray;
  display: inline-block;
  width: 44px;
  transition: transform 0.6s ease-in-out;
  transform: ${(props) => (props.refreshClicked ? `rotate(360deg)` : null)};
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
