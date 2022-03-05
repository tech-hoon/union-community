import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
import CardContainer from 'components/common/PostCardLayout/CardContainer';
import CategoryBox from 'components/Home/CategoryBox';
import OrderbyBox from 'components/Home/OrderbyBox';
import Footer from 'components/common/Footer';
import PostCardSkeleton from 'components/common/Skeletons/PostCardSkeleton';
import useIntersectionObserver from 'hooks/post/useIntersectionObserver';
import useSessionStorage from 'hooks/common/useSessionStorage';

import { useState, useRef, useEffect, useLayoutEffect, memo, useCallback } from 'react';
import { useGetPosts } from 'hooks/post/useGetPosts';
import { getUserData } from 'api/user';
import { loginUserState } from 'store/loginUser';
import { LoginUserType } from 'types';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import PortalContainer from 'components/common/Portal/PortalContainer';
import UploadButtonModal from 'components/common/Portal/UploadButtonModal';
import UploadIcon from 'assets/icons/UploadIcon';

import MainBannerSlider from 'components/common/Slider/MainBannerSlider';
import { useHistory } from 'react-router-dom';

const Home = () => {
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

  const fetchUserData = async () => {
    const __user = await getUserData(loginUser.uid);
    __user && setLoginUser(__user);
  };

  const [scrollY, setScrollY] = useSessionStorage('scrollY', 0);
  const [uploadButtonOpened, setUploadButtonOpened] = useState(false);
  const [refreshButtonClicked, setRefreshButtonClicked] = useState(false);

  const ioRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ioRef, isLastPost, {});
  const history = useHistory();
  const historyState = history.location.state;

  const onRefreshClick = useCallback(() => {
    setRefreshButtonClicked(!refreshButtonClicked);
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
    if (historyState === 'profileUpdated') {
      fetchUserData();
      history.replace({ state: '' });
      onRefreshClick();
    }

    // 글 등록,수정,삭제일 경우, fetch만
    if (historyState) {
      history.replace({ state: '' });
      onRefreshClick();
    }
  }, []);

  // IO 감지시 게시물 추가 fetch
  useEffect(() => {
    if (entry?.isIntersecting && !isFetchingMore) {
      fetchMorePosts();
    }
  }, [lastVisiblePost, entry, isFetchingMore]);

  useEffect(() => {
    if (!isFetching && refreshButtonClicked) {
      setRefreshButtonClicked(false);
    }
  }, [isFetching]);

  return (
    <Wrapper>
      <Navbar />
      <MainBannerSlider />

      <CategoryBox />
      <MidWrapper>
        <OrderbyBox />
      </MidWrapper>
      {isFetching ? <PostCardSkeleton /> : <CardContainer posts={posts} />}
      {/* {postHasUpdated && <RefreshButton onClick={onRefreshClick}>새 게시물</RefreshButton>} */}
      <RefreshButton onClick={onRefreshClick} isClicked={refreshButtonClicked}>
        ↪
      </RefreshButton>
      <UploadButton onClick={onUploadClick} isClicked={uploadButtonOpened}>
        <UploadIcon />
        {uploadButtonOpened && (
          <PortalContainer onClose={onUploadClick} center={false}>
            <UploadButtonModal />
          </PortalContainer>
        )}
      </UploadButton>
      <Footer />
      <Observer ref={ioRef} />
    </Wrapper>
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
    bottom: 40px;
  }
`);

const Observer = styled.div`
  bottom: 0;
  height: 20px;
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
    margin: 20px;
    padding: 0px;
  }
`);

const RefreshButton = styled(UploadButton)`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: white;

  font-size: 16px;
  font-weight: 500;

  color: ${({ theme }) => theme.color.main};
  border: 1px solid ${({ theme }) => theme.color.main};

  left: 48px;
  bottom: 64px;

  transform: ${({ isClicked }) => (isClicked ? `rotate(360deg)` : null)};
  transform-origin: center;
  transition: 0.5s;

  @media ${({ theme }) => theme.size.mobile} {
    left: 24px;
    bottom: 40px;
  }

  display: none;
  @media all and (display-mode: standalone) {
    display: inline;
  }
`;

export default memo(Home);
