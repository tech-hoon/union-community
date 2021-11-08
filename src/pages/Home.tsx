import { memo, useCallback } from 'react';
import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
import PostCardBox from 'components/Home/PostCardBox';
import CategoryBox from 'components/Home/CategoryBox';
import OrderbyBox from 'components/Home/OrderbyBox';
import Footer from 'components/common/Footer';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { useState, useRef, useEffect } from 'react';
import CardSkeleton from 'components/common/Skeletons/CardSkeleton';
import { useGetPosts } from 'hooks/useGetPosts';
import SearchBox from 'components/Home/SearchBox';
import { Refresh } from '@styled-icons/foundation';

interface Props {}

const Home = (props: Props) => {
  const { posts, lastVisible, fetchMorePosts, isLoading } = useGetPosts();
  const [refreshClicked, setRefreshClicked] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const onRefreshClick = () => {
    fetchMorePosts();
    setRefreshClicked(!refreshClicked);
  };

  const ioRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ioRef, {});

  useEffect(() => {
    entry?.isIntersecting && fetchMorePosts();
  });

  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      <CategoryBox />
      <MidWrapper>
        <OrderbyBox />
        {/* <RefreshButton onClick={onRefreshClick} refreshClicked={refreshClicked}>
          <Refresh />
        </RefreshButton> */}
        <SearchBox />
      </MidWrapper>
      {isLoading ? <CardSkeleton /> : <PostCardBox posts={posts || []} />}
      <Observer ref={ioRef} />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Observer = styled.div`
  bottom: 0;
  height: 20px;
  /* background-color: red; */
`;

const MidWrapper = styled.div`
  max-width: 1120px;
  padding: 0 60px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;

  margin: 0 auto;
  justify-content: space-between;

  @media ${({ theme }) => theme.size.mobile} {
    width: 95%;
    padding: 0;
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

export default memo(Home);
