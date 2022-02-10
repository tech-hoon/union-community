import { memo } from 'react';
import styled from 'styled-components';
import PeopleAvatar from 'components/common/Avatar/PeopleAvatar';
import { Layouts as S } from './Layouts';

interface Props {}

const MainBanner = (props: Props) => {
  return (
    <S.Wrapper>
      <Banner>
        <Content>
          <b>대학생 연합기숙사 입주생</b>을 위한 커뮤니티 <Highlight>유니온</Highlight>입니다.
          <br />
          <b>일상, 스터디</b> 등 다양한 정보를 나누어 보세요.
        </Content>
        <AvatarWrapper>
          <PeopleAvatar />
        </AvatarWrapper>
      </Banner>
    </S.Wrapper>
  );
};

const Banner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  background-color: #e3f4ff;
`;

const Content = styled.h1`
  font-weight: 200;
  font-size: 1.9rem;
  line-height: 1.5;
  letter-spacing: -0.05em;
  text-align: start;
  word-break: keep-all;

  & > b {
    font-weight: 400;
  }

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1.5rem;
  }

  @media (max-width: 500px) {
    font-size: 1.3rem;
  }

  @media ${({ theme }) => theme.size.mobileS} {
    font-size: 1.1rem;
  }
`;

const Highlight = styled.span`
  font-weight: 600;
  color: #18a0fb;
`;

const AvatarWrapper = styled.div`
  width: clamp(330px, 60vw, 500px);
`;

export default memo(MainBanner);
