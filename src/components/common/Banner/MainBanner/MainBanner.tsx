import { memo } from 'react';
import styled from 'styled-components';
import PeopleAvatar from 'components/common/Avatar/PeopleAvatar';
import { Layouts as S } from './Layouts';

interface Props {}

const MainBanner = (props: Props) => {
  return (
    <S.Wrapper>
      <Container>
        <Content>
          <b>대학생 연합기숙사 입주생</b>을 위한 커뮤니티 <Highlight>유니온</Highlight>입니다.
          <br />
          <b>일상, 스터디</b> 등 다양한 정보를 나누어 보세요.
        </Content>
        <AvatarWrapper>
          <PeopleAvatar />
        </AvatarWrapper>
      </Container>
    </S.Wrapper>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  height: 100%;
  background-color: #eee;
`;

const Content = styled.h1`
  font-weight: 200;
  font-size: 1.9rem;
  line-height: 1.5;
  letter-spacing: -0.05em;
  text-align: start;
  word-break: keep-all;
  flex: 1;

  & > b {
    font-weight: 400;
  }

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1.7rem;
  }

  @media (max-width: 500px) {
    font-size: 1.4rem;
  }

  @media ${({ theme }) => theme.size.mobileS} {
    font-size: 1.2rem;
  }
`;

const Highlight = styled.span`
  font-weight: 600;
  color: #18a0fb;
`;

const AvatarWrapper = styled.div``;

export default memo(MainBanner);
