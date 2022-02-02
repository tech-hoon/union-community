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
import { useState, useRef, useEffect, useLayoutEffect, memo, useCallback } from 'react';
import { useGetPosts } from 'hooks/post/useGetPosts';
import { useLocation } from 'react-router';
import { getUserData } from 'api/user';
import { loginUserState } from 'store/loginUser';
import { LoginUserType } from 'types';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { dbService } from 'service/firebase';
import useSessionStorage from 'hooks/common/useSessionStorage';
import PortalContainer from 'components/common/Portal/PortalContainer';
import UploadButtonModal from 'components/common/Portal/UploadButtonModal';
import UploadIcon from 'assets/icons/UploadIcon';
import { Helmet } from 'react-helmet';

const Home = () => {
  const location = useLocation();
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
  const [postCountSession, setPostCountSession] = useSessionStorage('post_count', 0);
  const [uploadButtonOpened, setUploadButtonOpened] = useState(false);

  const ioRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ioRef, isLastPost, {});

  const onRefreshClick = useCallback(() => {
    setIsUpdated(false);
    window.scroll({ behavior: 'smooth', top: 0 });
    fetchPosts();
  }, []);

  const onUploadClick = useCallback(() => {
    setUploadButtonOpened(!uploadButtonOpened);
  }, [uploadButtonOpened]);

  useLayoutEffect(() => {
    window.scrollTo({ top: scrollY });
    return () => setScrollY(window.scrollY);
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
    <>
      <Helmet>
        <meta name='theme-color' content={uploadButtonOpened ? '#7C7C7C' : '#f8f9fa'} />
      </Helmet>

      <Wrapper>
        <Navbar />
        <BannerWrapper>
          <Banner />
        </BannerWrapper>
        <CategoryBox />
        <MidWrapper>
          <OrderbyBox />
        </MidWrapper>
        {isFetching ? <PostCardSkeleton /> : <PostCardBox posts={posts} />}
        {/* {isUpdated && <RefreshButton onClick={onRefreshClick}>새 게시물</RefreshButton>} */}
        <UploadButton onClick={onUploadClick} isClicked={uploadButtonOpened}>
          <UploadIcon />
          {uploadButtonOpened && (
            <PortalContainer onClose={onUploadClick} overlay={false}>
              <UploadButtonModal />
            </PortalContainer>
          )}
        </UploadButton>
        <Observer ref={ioRef} />
        <Footer />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div``;

interface IUploadButton {
  isClicked: boolean;
}

const UploadButton = memo(styled.button<IUploadButton>`
  position: fixed;
  z-index: 2000;
  cursor: pointer;

  right: 48px;
  bottom: 64px;

  transform: ${({ isClicked }) => (isClicked ? `rotate(45deg)` : null)};
  transform-origin: center;
  transition: 0.3s;

  @media ${({ theme }) => theme.size.mobile} {
    right: 24px;
    bottom: 54px;
  }
`);

const Observer = styled.div`
  bottom: 0;
  height: 20px;
`;

const BannerWrapper = styled.div`
  /* @media ${({ theme }) => theme.size.mobile} {
    display: none;
  } */
`;

const MidWrapper = memo(styled.div`
  max-width: ${({ theme }) => theme.container.maxWidth};
  padding: ${({ theme }) => `0 ${theme.container.paddingLeftRight}`};

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
`);

const RefreshButton = memo(styled.button`
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
`);

export default memo(Home);
