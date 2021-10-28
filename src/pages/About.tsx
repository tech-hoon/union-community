import { useState, memo, useEffect } from 'react';
import Navbar from 'components/common/Navbar';
import LoginButton from 'components/common/LoginButton';
import styled from 'styled-components';
import PeopleAvatar from 'components/About/PeopleAvatar';
import { getUserPostCount } from 'api/count';

interface Props {}

const About = (props: Props) => {
  const [count, setCount] = useState({
    userCount: 0,
    postCount: 0,
  });

  useEffect(() => {
    const fetchCount = async () => {
      const count = await getUserPostCount();
      setCount(count);
    };

    fetchCount();
  }, []);

  return (
    <Wrapper>
      <Navbar isLoggedIn={false} />
      <Container>
        <Content>
          <Strong>대학생 연합기숙사 입주생</Strong>을 위한 커뮤니티입니다.
          <br />
          가입하고 <Strong>동아리, 스터디</Strong> 등 다양한 정보를 나누어 보세요!
        </Content>
        <PeopleAvatar />
        <CountBox>
          <Strong>{count.postCount}</Strong>개의 글과 <Strong>{count.userCount}</Strong>명의
          사용자가 함께하고 있어요!
        </CountBox>
        <ButtonWrapper>
          <LoginButton />
        </ButtonWrapper>
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

const Content = styled.p`
  font-weight: 200;
  font-size: 2em;
  line-height: 180%;
  letter-spacing: -0.05em;
  text-align: start;

  align-self: baseline;
  word-break: keep-all;
  margin-top: 3%;

  @media ${({ theme }) => theme.size.mobile} {
    margin-top: 5%;
    font-size: 1.4em;
    line-height: 200%;
  }
`;

const Strong = styled.strong`
  font-weight: 500;
`;

const CountBox = styled.div``;

const ButtonWrapper = styled.div`
  @media ${({ theme }) => theme.size.mobile} {
    margin-top: 10%;
  }
`;

export default memo(About);
