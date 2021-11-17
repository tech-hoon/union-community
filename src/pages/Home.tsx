import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
import PostCardBox from 'components/Home/PostCardBox';
import CategoryBox from 'components/Home/CategoryBox';
import OrderbyBox from 'components/Home/OrderbyBox';
import Footer from 'components/common/Footer';
import useIntersectionObserver from 'hooks/post/useIntersectionObserver';
import { useState, useRef, useEffect, useLayoutEffect, memo } from 'react';
import CardSkeleton from 'components/common/Skeletons/CardSkeleton';
import SearchBox from 'components/Home/SearchBox';
import { dbService } from 'service/firebase';
import { useGetPosts } from 'hooks/post/useGetPosts';
import useLocalStorage from 'hooks/common/useLocalStorage';
import { useLocation } from 'react-router';

interface Props {}

const Home = (props: Props) => {
  const { posts, updatePosts, fetchMorePosts, isLoading, lastVisiblePost } = useGetPosts();
  const location = useLocation();
  const [isUpdated, setIsUpdated] = useState(false);
  const ioRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ioRef, {});

  const [scrollY, setScrollY] = useLocalStorage('scrollY', 0);

  const onRefreshClick = () => {
    setIsUpdated(false);
    updatePosts();
    window.scroll({ behavior: 'smooth', top: 0 });
  };

  useLayoutEffect(() => {
    window.scrollTo({ top: scrollY });

    const unsubscribe = dbService.collection('posts').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        //TODO: 조회수 갱신(수정) 때문에 error 생김
        if (change.type === 'modified') {
          console.log('new post');
          setIsUpdated(true);
        }
      });
    });

    return () => {
      unsubscribe();
      setScrollY(window.scrollY);
    };
  }, []);

  useEffect(() => {
    // 새 글,수정,삭제시 새로운 게시물로 fetch
    location.state && updatePosts();
  }, []);

  useEffect(() => {
    entry?.isIntersecting && fetchMorePosts();
  }, [lastVisiblePost, entry]);

  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      <CategoryBox />
      <MidWrapper>
        <OrderbyBox />
        <SearchBox />
      </MidWrapper>
      {isLoading ? <CardSkeleton /> : <PostCardBox posts={posts} />}
      {isUpdated && <RefreshButton onClick={onRefreshClick}>새 게시물</RefreshButton>}
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
  @keyframes popUpAnimation {
    0% {
      opacity: 0;
      top: -50%;
    }

    100% {
      opacity: 1;
      top: 20%;
    }
  }

  top: -200%;
  width: 100px;
  height: 30px;
  position: fixed;
  left: 50%;
  background-color: white;
  box-shadow: 0px 1px 1px rgb(0 0 0 / 25%);
  transform: translate(-50%, -50%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;

  animation: popUpAnimation 0.5s ease 0s 1 normal forwards running;
`;

export default memo(Home);
