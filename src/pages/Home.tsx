import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
import PostCardBox from 'components/common/PostCard/PostCardBox';
import CategoryBox from 'components/Home/CategoryBox';
import OrderbyBox from 'components/Home/OrderbyBox';
import Footer from 'components/common/Footer';
import Banner from 'components/common/Banner';
import PostCardSkeleton from 'components/common/Skeletons/PostCardSkeleton';
import useIntersectionObserver from 'hooks/post/useIntersectionObserver';
import useLocalStorage from 'hooks/common/useLocalStorage';
import { useState, useRef, useEffect, useLayoutEffect, memo } from 'react';
import { useGetPosts } from 'hooks/post/useGetPosts';
import { useLocation, useHistory } from 'react-router';
import { getUserData } from 'api/user';
import { loginUserState } from 'store/loginUser';
import { LoginUserType } from 'types';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import smoothscroll from 'smoothscroll-polyfill';
import { dbService } from 'service/firebase';
import useSessionStorage from 'hooks/common/useSessionStorage';
import UploadIcon from 'assets/icons/UploadIcon';

const Home = () => {
  const location = useLocation();
  const history = useHistory();

  const setLoginUser = useSetRecoilState(loginUserState);
  const loginUser = useRecoilValue(loginUserState) as LoginUserType;

  const {
    posts,
    fetchPosts,
    fetchMorePosts,
    isFetching,
    isFetchingMore,
    lastVisiblePost,
    isLastPost,
  } = useGetPosts();

  const [isUpdated, setIsUpdated] = useState(false);
  const [scrollY, setScrollY] = useLocalStorage('scrollY', 0);

  const ioRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ioRef, isLastPost, {});

  const [postCountSession, setPostCountSession] = useSessionStorage('post_count', 0);

  const onRefreshClick = () => {
    setIsUpdated(false);
    window.scroll({ behavior: 'smooth', top: 0 });
    fetchPosts();
  };

  const onUploadClick = () => {
    history.push({ pathname: '/upload', state: { mode: 'add', initialPost: null } });
  };

  useLayoutEffect(() => {
    window.scrollTo({ top: scrollY });

    return () => {
      setScrollY(window.scrollY);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const __user = await getUserData(loginUser.uid);
      __user && setLoginUser(__user);
    };

    // 프로필 변경 시, 새 데이터로 fetch
    if (location.state === 'profileUpdated') {
      setIsUpdated(false);
      fetchUserData();
      fetchPosts();
      return;
    }

    // smooth scroll iOS polyfill
    smoothscroll.polyfill();

    // 글 등록,수정,삭제 시 새 데이터로 fetch
    if (location.state) {
      setIsUpdated(false);
      fetchPosts();
    }
  }, []);

  useEffect(() => {
    const unsubscribe = dbService.collection('posts').onSnapshot((snapshot) => {
      if (postCountSession !== snapshot.size && postCountSession) {
        setIsUpdated(true);
      }
      setPostCountSession(snapshot.size);
    });

    return () => unsubscribe();
  }, []);

  // IO 감지시 게시물 추가 fetch
  useEffect(() => {
    if (entry?.isIntersecting && !isFetchingMore) {
      fetchMorePosts();
    }
  }, [lastVisiblePost, entry, isFetchingMore]);

  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      <BannerWrapper>
        <Banner />
      </BannerWrapper>
      <CategoryBox />
      <MidWrapper>
        <OrderbyBox />
      </MidWrapper>
      {isFetching ? <PostCardSkeleton /> : <PostCardBox posts={posts} />}
      {isUpdated && <RefreshButton onClick={onRefreshClick}>새 게시물</RefreshButton>}
      <UploadButton onClick={onUploadClick}>
        <UploadIcon />
      </UploadButton>
      <Observer ref={ioRef} />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const UploadButton = styled.div`
  position: fixed;
  z-index: 2;
  cursor: pointer;

  width: 75px;
  height: 75px;

  right: 48px;
  bottom: 64px;

  @media ${({ theme }) => theme.size.mobile} {
    right: 24px;
    bottom: 52px;
  }
`;

const Observer = styled.div`
  bottom: 0;
  height: 20px;
`;

const BannerWrapper = styled.div`
  @media ${({ theme }) => theme.size.mobile} {
    display: none;
  }
`;

const MidWrapper = styled.div`
  max-width: 1120px;
  padding: 0 60px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;

  margin: 32px auto;
  justify-content: space-between;

  @media ${({ theme }) => theme.size.mobile} {
    width: 95%;
    margin: 19px auto;
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
      top: 18%;
    }
  }

  font-size: 1rem;
  padding: 12px 20px;

  top: -200%;
  position: fixed;
  left: 50%;
  background-color: white;
  color: black;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px 0px rgb(0 0 0 / 25%);
  border-radius: 50px;

  animation: popUpAnimation 0.5s ease 0s 1 normal forwards running;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.8rem;
    padding: 6px 16px;
  }
`;

export default memo(Home);
