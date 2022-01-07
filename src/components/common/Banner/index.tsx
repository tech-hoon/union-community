import { memo } from 'react';
import styled from 'styled-components';
import PeopleAvatar from './PeopleAvatar';

interface Props {}

const Banner = (props: Props) => {
  return (
    <Wrapper>
      <Content>
        <Bold>대학생 연합생활관 입주생</Bold>을 위한 커뮤니티입니다.
        <br />
        <Bold>동아리, 스터디</Bold> 등 다양한 정보를 나누어 보세요!
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
  margin: 48px auto 24px;
  gap: 12px;
  flex-direction: column;
`;

const Content = styled.h1`
  font-weight: 200;
  font-size: 2rem;
  line-height: 1.5;
  letter-spacing: -0.05em;
  text-align: start;
  word-break: keep-all;
  flex: 1;

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

const Bold = styled.b`
  font-weight: 500;
`;

const AvatarWrapper = styled.div`
  @media (max-width: 468px) {
    /* display: none; */
  }
`;

export default memo(Banner);
