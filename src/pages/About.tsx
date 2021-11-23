import { useState, memo, useEffect } from 'react';
import Navbar from 'components/common/Navbar';
import LoginButton from 'components/common/LoginButton';
import styled from 'styled-components';
import PeopleAvatar from 'components/About/PeopleAvatar';
import { getUserPostCount } from 'api/count';
import { useRecoilState, useRecoilValue } from 'recoil';
import useLoginStep from 'hooks/useLoginStep';
import { authService } from 'service/firebase';
import { getUserData } from 'api/user';
import { loginUserState } from 'store/loginUser';
import { useHistory } from 'react-router';
import { Loading } from 'pages';

const About = () => {
  const [count, setCount] = useState({ userCount: 0, postCount: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  const { onLoginStepReset, onLoginStepNext } = useLoginStep();
  const history = useHistory();

  const hasRegistered = async (uid: string) => {
    return await getUserData(uid);
  };

  const fetchCount = async () => {
    const count = await getUserPostCount();
    console.log('count', count);
    setCount(count);
  };

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (user) => {
      if (user) {
        const res = await hasRegistered(user.uid);
        if (res) {
          setIsLoading(false);
          setLoginUser({ ...loginUser, ...res });
          history.push('/home');
          return;
        }
        onLoginStepNext();
        return;
      }
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      fetchCount();
    }, 2500);

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
        <Top>
          <Content>
            <Strong>대학생 연합기숙사 입주생</Strong>을 위한 커뮤니티입니다.
            <br />
            <Strong>동아리, 스터디</Strong> 등 다양한 정보를 나누어 보세요!
          </Content>
          <AvatarWrapper>
            <PeopleAvatar />
          </AvatarWrapper>
        </Top>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <CountBox>
              <Strong>{count.postCount}</Strong>개의 글과 <Strong>{count.userCount}</Strong>명의
              사용자가 함께하고 있어요!
            </CountBox>
            <ButtonWrapper>
              <LoginButton />
            </ButtonWrapper>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Top = styled.div`
  display: flex;
  width: 100%;
`;

const Content = styled.p`
  font-weight: 200;
  font-size: 1.4rem;
  line-height: 180%;
  letter-spacing: -0.05em;
  text-align: start;

  align-self: baseline;
  word-break: keep-all;
  /* margin-top: 3%; */

  flex: 2;

  @media ${({ theme }) => theme.size.mobile} {
    /* font-size: 1.4em; */
    line-height: 200%;
  }
`;

const Strong = styled.strong`
  font-weight: 500;
`;

const AvatarWrapper = styled.div`
  flex: 8;
`;

const CountBox = styled.div``;

const ButtonWrapper = styled.div`
  margin-top: 3%;

  @media ${({ theme }) => theme.size.mobile} {
    margin-top: 10%;
  }
`;

export default memo(About);
