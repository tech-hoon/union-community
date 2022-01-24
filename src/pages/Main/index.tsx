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
import PeopleAvatar from 'components/common/Banner/PeopleAvatar';
import Description from 'components/Main/Description';
import Onboarding1 from 'components/Main/OnboardingContainer/Onboarding1';
import Onboarding2 from 'components/Main/OnboardingContainer/Onboarding2';
import Onboarding3 from 'components/Main/OnboardingContainer/Onboarding3';
import Navbar from 'components/common/Navbar';

const About = () => {
  const [count, setCount] = useState({ user: 0, post: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const loginUser = useRecoilValue(loginUserState) as LoginUserType;
  const { onLoginStepReset, onLoginStepNext, setLoginStep } = useLoginStep();
  const setLoginUser = useSetRecoilState(loginUserState);

  const heightRef = useRef<HTMLDivElement>(null);
  const screenHeight = heightRef.current?.clientHeight as number;

  const history = useHistory();

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
    const target = e.target as HTMLElement;
    const id = target.dataset.pageId;
    window.scroll({ behavior: 'smooth', top: Number(id) * screenHeight });
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
          <Navbar>
            <Aside onClick={onClickScrollDown} isLoading={isLoading}>
              <Menu data-page-id={1}>유니온이란?</Menu>
              <Menu data-page-id={2}>기능 소개</Menu>
              <Menu data-page-id={3}>가입 절차</Menu>
            </Aside>
          </Navbar>
        </NavbarWrapper>
        <LogoWrapper>
          <MainLogo />
        </LogoWrapper>
        <Contents>
          <Description />
          <CountBalloon isLoading={isLoading || !count.post}>
            {isLoading || !count.post ? (
              <em>Loading...</em>
            ) : (
              <p>
                <em {...counter[1]}>0</em>명의 사용자와 <em {...counter[0]}>0</em>개의 글이 있어요!
              </p>
            )}
          </CountBalloon>
          <PeopleAvatar />
        </Contents>
        <ButtonWrapper isLoading={isLoading}>
          <DetailButton data-page-id={1} onClick={onClickScrollDown}>
            자세히
          </DetailButton>
          <LoginModalButton />
        </ButtonWrapper>
      </Container>
      <Onboarding1 onClick={onClickScrollDown} screenHeight={screenHeight} />
      <Onboarding2 onClick={onClickScrollDown} screenHeight={screenHeight} />
      <Onboarding3 screenHeight={screenHeight} />
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

const LogoWrapper = styled.div`
  display: none;
  margin: 0 auto;
  width: 150px;
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
  scroll-snap-align: start;
`;

const Aside = styled.ul<{ isLoading: boolean }>`
  display: flex;
  visibility: ${({ isLoading }) => isLoading && `hidden`};
  gap: 20px;
  align-items: center;
`;

const Menu = styled.li`
  cursor: pointer;
`;

const Contents = styled.div`
  display: flex;
  margin: 5% auto;
  flex-direction: column;
  align-items: center;

  @media ${({ theme }) => theme.size.tablet} {
    margin: 30px auto;
  }

  @media ${({ theme }) => theme.size.mobile} {
    margin: 20px auto;
  }
`;

const CountBalloon = styled.h3<{ isLoading: boolean }>`
  position: relative;
  font-size: 20px;
  line-height: 25px;
  font-weight: 300;
  width: 100%;
  text-align: center;

  background-color: #e0f0fb;
  padding: 26px 10px;
  border-radius: 100px;
  margin-bottom: 10px;

  &:after {
    content: '';
    position: absolute;
    border-top: 20px solid #e0f0fb;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
    top: 75px;
    left: 220px;
  }

  & em {
    color: ${({ theme }) => theme.color.MAIN};
    font-weight: bold;
  }

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 18px;
  }
`;

const ButtonWrapper = styled.div<{ isLoading: boolean }>`
  visibility: ${({ isLoading }) => isLoading && `hidden`};
  flex: 1;
  margin: 0 auto;

  @media ${({ theme }) => theme.size.mobile} {
    margin: 0% auto 5%;
  }
`;

const DetailButton = styled.button`
  width: 160px;
  font-weight: 400;
  font-size: 20px;
  padding: 10px 45px;
  border-radius: 113.374px;
  background-color: white;
  color: ${({ theme }) => theme.color.MAIN};
  border: 1.13374px solid ${({ theme }) => theme.color.MAIN};
  margin-right: 12px;
`;

export default memo(About);
