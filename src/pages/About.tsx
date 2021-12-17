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
import { authService, dbService } from 'service/firebase';
import { getUserData } from 'api/user';
import { loginUserState } from 'store/loginUser';
import { useHistory } from 'react-router';
import { LoginUserType, UserType, MessageType } from 'types';
import { AUTH_REJECTED_STEP, AUTH_WAITING_STEP } from 'utils/config';
import { hasNewReceivedMessageState, receivedMessageState } from 'store/message';
import useLocalStorage from 'hooks/common/useLocalStorage';

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

  const setReceivedMessage = useSetRecoilState(receivedMessageState);
  const setHasNewReceivedMessage = useSetRecoilState(hasNewReceivedMessageState);

  const [messageCountLS, setMessageCountLS] = useLocalStorage('received_message_count', 0);
  const [hasNewReceivedMessageLS, setHasNewReceivedMessageLS] = useLocalStorage(
    'has_new_message',
    false
  );

  const fetchUserData = async (uid: string) => {
    return await getUserData(uid);
  };

  const fetchCount = async () => {
    const count = await getUserPostCount();
    setCount(count);
  };

  const fetchReceivedMessage = async (uid: string) => {
    const res: any = await dbService.doc(`users/${uid}`).get();
    const __messages: any[] = res.data().received_message_list;
    const newMessages: any = await Promise.all(
      __messages.map(async (message) => {
        const { uid, avatar_id, nickname } = (await message.user.get()).data();
        return {
          ...message,
          user: { uid, avatar_id, nickname },
        };
      })
    );

    if (messageCountLS < newMessages.length || hasNewReceivedMessageLS) {
      setHasNewReceivedMessage(true);
      setHasNewReceivedMessageLS(true);
    }

    const sortedMessage = newMessages.sort(
      (a: MessageType, b: MessageType) => b.created_at - a.created_at
    );

    console.log(sortedMessage);
    setMessageCountLS(sortedMessage.length);
    setReceivedMessage(sortedMessage);
  };

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (user) => {
      if (user) {
        const res = await fetchUserData(user.uid);
        setIsLoading(false);

        if (res?.auth_status === 'approved') {
          setLoginUser({ ...loginUser, ...res });
          fetchReceivedMessage(user.uid);
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

    const timer = setTimeout(() => {
      fetchCount();
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      onLoginStepReset();
      unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      <Navbar isLoggedIn={false} />
      <Container>
        <Banner />
        {isLoading ? (
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
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.div`
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CountBox = styled.div`
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
