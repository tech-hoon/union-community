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
import PeopleAvatar from 'components/About/PeopleAvatar';

//TODO: 새 게시물 감지시, unsubscribe
const Home = () => {
  const { posts, fetchPosts, fetchMorePosts, isLoading, lastVisiblePost } = useGetPosts();
  const location = useLocation();
  const [isUpdated, setIsUpdated] = useState(false);
  const ioRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ioRef, {});
  const [scrollY, setScrollY] = useLocalStorage('scrollY', 0);

  const onRefreshClick = () => {
    setIsUpdated(false);
    fetchPosts();
    window.scroll({ behavior: 'smooth', top: 0 });
  };

  useLayoutEffect(() => {
    window.scrollTo({ top: scrollY });

    // const unsubscribe = dbService.collection('posts').onSnapshot((snapshot) => {
    //   snapshot.docChanges().forEach((change) => {
    //     if (change.type === 'modified') {
    //       console.log('new post');
    //       setIsUpdated(true);
    //     }
    //   });
    // });

    return () => {
      // unsubscribe();
      setScrollY(window.scrollY);
    };
  }, []);

  // 새 글,수정,삭제시 새로운 게시물로 fetch
  useEffect(() => {
    location.state && fetchPosts();
  }, []);

  // IO 감지시 게시물 추가 fetch
  useEffect(() => {
    entry?.isIntersecting && fetchMorePosts();
  }, [lastVisiblePost, entry]);

  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      <TopWrapper>
        <Content>
          <Strong>대학생 연합기숙사 입주생</Strong>을 위한 커뮤니티입니다.
          <br />
          <Strong>동아리, 스터디</Strong> 등 다양한 정보를 나누어 보세요!
        </Content>
        <AvatarWrapper>
          <PeopleAvatar />
        </AvatarWrapper>
      </TopWrapper>
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

const TopWrapper = styled.div`
  display: flex;
  width: 90%;
  max-width: 1160px;
  align-items: center;
  margin: 24px auto 24px;
  gap: 12px;

  @media ${({ theme }) => theme.size.tablet} {
    width: 90%;
    flex-direction: column;
  }
`;

const Content = styled.p`
  font-weight: 200;
  font-size: 1.8rem;
  line-height: 1.7;
  letter-spacing: -0.05em;
  text-align: start;
  word-break: keep-all;
  flex: 1;

  @media ${({ theme }) => theme.size.tablet} {
    line-height: 1.5;
    font-size: 1.7rem;
  }

  @media ${({ theme }) => theme.size.mobile} {
    line-height: 1.5;
    font-size: 1.4rem;
  }

  @media (max-width: 500px) {
    font-size: 1.2rem;
  }

  @media ${({ theme }) => theme.size.mobileS} {
    line-height: 1.4;
    font-size: 1rem;
  }
`;

const Strong = styled.strong`
  font-weight: 500;
`;

const AvatarWrapper = styled.div`
  @media (max-width: 468px) {
    /* display: none; */
  }
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
