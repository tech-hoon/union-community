import React, { memo } from 'react';
import styled from 'styled-components';
import PeopleAvatar from './PeopleAvatar';

interface Props {}

const Banner = (props: Props) => {
  return (
    <Wrapper>
      <Content>
        <Strong>대학생 연합기숙사 입주생</Strong>을 위한 커뮤니티입니다.
        <br />
        <Strong>동아리, 스터디</Strong> 등 다양한 정보를 나누어 보세요!
      </Content>
      <AvatarWrapper>
        <PeopleAvatar />
      </AvatarWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 90%;
  max-width: 1160px;
  align-items: center;
  margin: 24px auto 24px;
  gap: 12px;

  @media ${({ theme }) => theme.size.tablet} {
    flex-direction: column;
  }
`;

const Content = styled.p`
  font-weight: 200;
  font-size: 1.7rem;
  line-height: 1.5;
  letter-spacing: -0.05em;
  text-align: start;
  word-break: keep-all;
  flex: 1;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1.5rem;
  }

  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

const Strong = styled.strong`
  font-weight: 500;
`;

const AvatarWrapper = styled.div`
  @media (max-width: 468px) {
    /* display: none; */
  }
`;

export default memo(Banner);
