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
import MainLogo from 'assets/logo/MainLogo';
import PeopleAvatar from 'components/common/Banner/PeopleAvatar';
import DetailContainer1 from './DetailContainer1';
import DetailContainer2 from './DetailContainer2';
import DetailContainer3 from './DetailContainer3';

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

  const onClickDetailButton = () => {
    window.scroll({ behavior: 'smooth', top: window.innerHeight });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });

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
      <Container>
        <LogoWrapper>
          <MainLogo />
        </LogoWrapper>
        <Contents>
          <Description>
            <b>대학생 연합기숙사 입주생</b>을 위한
            <br /> 커뮤니티 <em>유니온</em>입니다.
            <br /> 가입하고 <b>일상, 스터디</b> 등<br />
            다양한 정보를 나누어 보세요.
          </Description>
          <CountBalloon isLoading={isLoading || !count.post}>
            {isLoading || !count.post ? (
              <em>Loading...</em>
            ) : (
              <>
                <em {...counter[1]}>0</em>명의 사용자와 <em {...counter[0]}>0</em>개의 글이 있어요!
              </>
            )}
          </CountBalloon>
          <PeopleAvatar />
        </Contents>
        <ButtonWrapper>
          <DetailButton onClick={onClickDetailButton}>자세히</DetailButton>
          <LoginModalButton />
        </ButtonWrapper>
      </Container>
      <DetailContainer1 />
      <DetailContainer2 />
      <DetailContainer3 />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  overflow: auto;
  scroll-snap-type: y mandatory;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  height: 100vh;
  padding: 10% 0;
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10% 0;
  scroll-snap-align: start;

  @media ${({ theme }) => theme.size.mobile} {
    padding: 40px 0;
  }
`;

const LogoWrapper = styled.div`
  margin: 0 auto;
  width: 167px;
  height: 57px;
`;

const Contents = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface IBallon {
  isLoading: boolean;
}

const CountBalloon = styled.h3<IBallon>`
  position: relative;
  font-size: 20px;
  line-height: 25px;
  font-weight: 300;
  width: 100%;
  text-align: center;

  background-color: #e0f0fb;
  padding: 26px 17px;
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
    left: ${({ isLoading }) => (isLoading ? `120px` : `204px`)};
  }

  & em {
    color: ${({ theme }) => theme.color.MAIN};
    font-weight: bold;
  }
`;

const Description = styled.h1`
  font-weight: 300;
  font-size: 20px;
  line-height: 35px;
  letter-spacing: -0.05em;
  text-align: left;
  width: 90%;
  margin: 0 30px 10%;

  & b {
    font-weight: 400;
  }

  & em {
    font-weight: bold;
    color: ${({ theme }) => theme.color.MAIN};
  }
`;

const ButtonWrapper = styled.div`
  margin: 0 auto;
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
