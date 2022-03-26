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
import RefreshIcon from 'assets/icons/RefreshIcon';
import TopBanner from 'components/common/Banner/BottomBanner/TopBanner';
import Popup from 'components/Popup';
import { NEW_AVATAR_POPUP_IMG_SRC } from 'utils/config';

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

  const history = useHistory();
  const historyState = history.location.state;

  const observer = useRef<any>(null);

  const lastElemRef = useCallback(
    (node) => {
      if (isFetching || isFetchingMore) return;
      if (isLastPost) observer?.current?.disconnect();
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) fetchMorePosts();
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, isFetchingMore]
  );

  const onRefreshClick = async () => {
    setRefreshButtonClicked(!refreshButtonClicked);
    await fetchPosts();
    window.scroll({ behavior: 'smooth', top: 0 });
  };

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

  useEffect(() => {
    if (!isFetching && refreshButtonClicked) {
      setRefreshButtonClicked(false);
    }
  }, [isFetching]);

  return (
    <Wrapper>
      <TopBanner />
      <Navbar />
      <MainBannerSlider />

      <CategoryBox />
      <MidWrapper>
        <OrderbyBox />
      </MidWrapper>
      {isFetching ? (
        <PostCardSkeleton />
      ) : (
        <CardContainer posts={posts} lastElemRef={lastElemRef} />
      )}

      <RefreshButton onClick={onRefreshClick} isClicked={refreshButtonClicked}>
        <RefreshIcon />
      </RefreshButton>
      <UploadButton onClick={onUploadClick} isClicked={uploadButtonOpened}>
        <UploadIcon />
        {uploadButtonOpened && (
          <PortalContainer onClose={onUploadClick} center={false}>
            <UploadButtonModal />
          </PortalContainer>
        )}
      </UploadButton>

      <Popup imgSrc={NEW_AVATAR_POPUP_IMG_SRC} url='/setting' />

      <Footer />
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

const RefreshButton = styled.button<IUploadButton>`
  position: fixed;
  z-index: 1000;
  cursor: pointer;

  left: 48px;
  bottom: 64px;

  transform: ${({ isClicked }) => (isClicked ? `rotate(300deg)` : null)};
  transition: 0.3s;

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
