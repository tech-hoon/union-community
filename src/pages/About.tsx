import Navbar from 'components/common/Navbar';
import Banner from 'components/common/Banner';
import InterWind from 'components/common/Loading/InterWind';
import Footer from 'components/common/Footer';
import LoginModalButton from 'components/About/LoginModalButton';
import styled from 'styled-components';
import useLoginStep from 'hooks/useLoginStep';
import useCountUp from 'hooks/common/useCountUp';
import { useState, memo, useEffect } from 'react';
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

const About = () => {
  const [count, setCount] = useState({ user: 0, post: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const loginUser = useRecoilValue(loginUserState) as LoginUserType;
  const { onLoginStepReset, onLoginStepNext, setLoginStep } = useLoginStep();
  const setLoginUser = useSetRecoilState(loginUserState);

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
    setCount(count);
  };

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (user) => {
      if (user) {
        const res = await fetchUserData(user.uid);
        setIsLoading(false);

        if (res?.auth_status === 'approved') {
          setLoginUser({ ...loginUser, ...res });
          onFetchReceivedMessages(user.uid);
          onFetchNotifications(user.uid);

          history.push('/home');
          return;
        }

        if (res?.auth_status === 'rejected') {
          setLoginUser({ ...loginUser, ...res });
          setLoginStep(AUTH_REJECTED_STEP);
          return;
        }

        if (res?.auth_status === 'waiting') {
          setLoginUser({ ...loginUser, ...res });
          setLoginStep(AUTH_WAITING_STEP);
          return;
        }

        onLoginStepNext();
        return;
      }
    });

    (async () => await fetchCount())();

    setIsLoading(false);

    return () => {
      onLoginStepReset();
      unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      <Navbar isLoggedIn={false} />
      <Container>
        <Banner />
        {isLoading || !count.post ? (
          <InterWind />
        ) : (
          <>
            <CountBox>
              <Count {...counter[0]}>0</Count>개의 글과 <Count {...counter[1]}>0</Count>
              명의 사용자가 함께하고 있어요!
            </CountBox>
            <ButtonWrapper>
              <LoginModalButton />
            </ButtonWrapper>
          </>
        )}
      </Container>
      {/* <NoticeBanner>* 본 웹 사이트는 Chrome, Android, Safari에 최적화되어 있습니다.</NoticeBanner> */}
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const NoticeBanner = styled.p`
  text-align: center;
  margin: 30px auto 0;
  font-weight: 600;
  color: #666;
`;

const Container = styled.div`
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CountBox = styled.h3`
  font-size: 1.5rem;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1rem;
  }
`;

const Count = styled.strong`
  font-weight: bolder;
  color: ${({ theme }) => theme.color.MAIN};
  margin: 0 1px;
`;

const ButtonWrapper = styled.div`
  margin-top: 48px;

  @media ${({ theme }) => theme.size.mobile} {
    margin-top: 24px;
  }
`;

export default memo(About);
