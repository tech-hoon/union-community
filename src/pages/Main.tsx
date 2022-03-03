import LoginModalButton from 'components/Main/LoginModalButton';
import styled from 'styled-components';
import useLoginStep from 'hooks/useLoginStep';
import useCountUp from 'hooks/common/useCountUp';
import { useState, memo, useEffect, useRef } from 'react';
import { getUserPostCount } from 'api/count';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authService } from 'service/firebase';
import { getUserData } from 'api/user';
import { loginUserState } from 'store/loginUser';
import { useHistory } from 'react-router';
import { LoginUserType } from 'types';
import { AUTH_REJECTED_STEP, AUTH_WAITING_STEP } from 'utils/config';
import useReceivedMessage from 'hooks/message/useReceivedMessage';
import useNotification from 'hooks/useNotification';
import MainLogo from 'assets/logo/MainLogo';
import PeopleAvatar from 'components/common/Avatar/PeopleAvatar';
import Description from 'components/Main/Description';
import { Onboarding1, Onboarding2, Onboarding3 } from 'components/Main/OnboardingContainer';
import Navbar from 'components/common/Navbar';
import Balloon from 'components/Main/Balloon';
import { isMobile } from 'utils/mobileCheck';

const Main = () => {
  const [count, setCount] = useState({ user: 0, post: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const loginUser = useRecoilValue(loginUserState) as LoginUserType;
  const { onLoginStepReset, onLoginStepNext, setLoginStep } = useLoginStep();
  const setLoginUser = useSetRecoilState(loginUserState);

  const history = useHistory();

  const heightRef = useRef<HTMLDivElement>(null);
  const screenHeight = heightRef.current?.clientHeight as number;

  const counter = {
    0: useCountUp(count.post, 0, 400),
    1: useCountUp(count.user, 0, 400),
  };

  const { onFetchReceivedMessages } = useReceivedMessage();
  const { onFetchNotifications } = useNotification();

  const fetchUserData = async (uid: string) => {
    return await getUserData(uid);
  };

  const fetchCount = async () => {
    const count = await getUserPostCount();
    setIsLoading(false);
    setCount(count);
  };

  const onClickScrollDown: React.MouseEventHandler<HTMLElement> = (e) => {
    const scrollPosistion = isMobile() ? screenHeight : window.innerHeight;
    const target = e.target as HTMLElement;
    const id = target.dataset.pageId;

    window.scroll({ behavior: 'smooth', top: Number(id) * scrollPosistion });
  };

  const asyncHandler = async (user: any) => {
    if (user) {
      const res = await fetchUserData(user.uid);
      setIsLoading(false);

      switch (res?.auth_status) {
        case 'approved': {
          setLoginUser({ ...loginUser, ...res });
          onFetchReceivedMessages(user.uid);
          onFetchNotifications(user.uid);
          history.push('/home');
          break;
        }

        case 'rejected': {
          setLoginUser({ ...loginUser, ...res });
          setLoginStep(AUTH_REJECTED_STEP);
          break;
        }

        case 'waiting': {
          setLoginUser({ ...loginUser, ...res });
          setLoginStep(AUTH_WAITING_STEP);
          break;
        }

        default: {
          onLoginStepNext();
          break;
        }
      }
    }

    await fetchCount();
  };

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(asyncHandler);

    return () => {
      onLoginStepReset();
      unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      <Container ref={heightRef}>
        <NavbarWrapper>
          <Navbar children={null} />
        </NavbarWrapper>
        <MobileLogoWrapper>
          <MainLogo />
        </MobileLogoWrapper>
        <Contents>
          <Description />
          <Balloon isLoading={isLoading || !count.post}>
            {isLoading || !count.post ? (
              <Paragraph>
                <em>Loading...</em>
              </Paragraph>
            ) : (
              <Paragraph>
                <em {...counter[1]}>0</em>명의 사용자와 <em {...counter[0]}>0</em>개의 글이 있어요!
              </Paragraph>
            )}
          </Balloon>
          <AvatarWrapper>
            <PeopleAvatar />
          </AvatarWrapper>
        </Contents>
        <ButtonWrapper isLoading={isLoading}>
          <DetailButton data-page-id={1} onClick={onClickScrollDown}>
            자세히
          </DetailButton>
          <LoginModalButton />
        </ButtonWrapper>
      </Container>
      {!isLoading && (
        <>
          <Onboarding1 />
          <Onboarding2 />
          <Onboarding3 />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavbarWrapper = styled.div`
  @media ${({ theme }) => theme.size.mobile} {
    display: none;
  }
`;

const MobileLogoWrapper = styled.div`
  display: none;
  margin: 0 auto;
  width: clamp(130px, 20vw, 150px);
  margin-top: 40px;
  @media ${({ theme }) => theme.size.mobile} {
    display: inline;
  }
`;

const Container = styled.div`
  height: 100vh;
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Contents = styled.div`
  display: flex;
  margin: 20px auto;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div<{ isLoading: boolean }>`
  visibility: ${({ isLoading }) => isLoading && `hidden`};
  margin: 0 auto 10%;

  @media ${({ theme }) => theme.size.mobile} {
    margin: 0 auto 30%;
  }
`;

const AvatarWrapper = styled.div`
  /* width: clamp(360px, 30vw, 600px); */
  width: clamp(360px, 40vw, 600px);
`;

const Paragraph = styled.p`
  font-size: clamp(1rem, 2vw, 1.5rem);
  line-height: 25px;
  font-weight: 300;
  text-align: center;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 18px;
  }

  & em {
    color: ${({ theme }) => theme.color.main};
    font-weight: bold;
  }
`;

const DetailButton = styled.button`
  width: 160px;
  font-weight: 400;
  font-size: 20px;
  padding: 10px 45px;
  border-radius: 113.374px;
  background-color: white;
  color: ${({ theme }) => theme.color.main};
  border: 1.13374px solid ${({ theme }) => theme.color.main};
  margin-right: 12px;
`;

export default memo(Main);
