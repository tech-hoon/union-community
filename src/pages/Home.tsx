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
import { dbService } from 'service/firebase';
import useDidUpdateEffect from 'hooks/useDidUpdateEffect';

interface Props {}

const Home = (props: Props) => {
  const { posts, fetchPosts, fetchMorePosts, isLoading, isLastPost } = useGetPosts();
  const [isUpdated, setIsUpdated] = useState(true);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const ioRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ioRef, {});

  const onRefreshClick = () => {
    fetchPosts();
    setIsUpdated(false);
  };

  useDidUpdateEffect(() => {
    const unsubscribe = dbService.collection('posts').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified') {
          setIsUpdated(true);
        }
      });
    });

    isUpdated && unsubscribe();

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    entry?.isIntersecting && fetchMorePosts();
  });

  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      <CategoryBox />
      <MidWrapper>
        <OrderbyBox />
        <SearchBox />
      </MidWrapper>
      {isLoading ? <CardSkeleton /> : <PostCardBox posts={posts || []} />}
      {isUpdated && <RefreshButton onClick={onRefreshClick}>새 게시물</RefreshButton>}
      {!isLastPost && <Observer ref={ioRef} />}
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

const RefreshButton = styled.button`
  top: 25%;
  width: 100px;
  height: 30px;
  position: fixed;
  left: 50%;
  background-color: white;
  box-shadow: 0px 1px 1px rgb(0 0 0 / 25%);
  transform: translate(-50%, -50%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
`;

export default memo(Home);
