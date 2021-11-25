import { useState, memo, useEffect } from 'react';
import Navbar from 'components/common/Navbar';
import LoginButton from 'components/common/LoginButton';
import styled from 'styled-components';
import { getUserPostCount } from 'api/count';
import { useRecoilState } from 'recoil';
import useLoginStep from 'hooks/useLoginStep';
import { authService } from 'service/firebase';
import { getUserData } from 'api/user';
import { loginUserState } from 'store/loginUser';
import { useHistory } from 'react-router';
import { Loading } from 'pages';
import Banner from 'components/common/Banner';

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
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Strong = styled.strong`
  font-weight: 500;
`;

const CountBox = styled.div``;

const ButtonWrapper = styled.div`
  margin-top: 3%;

  @media ${({ theme }) => theme.size.mobile} {
    margin-top: 10%;
  }
`;

export default memo(About);
