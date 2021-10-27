import useLoginStep from 'hooks/useLoginStep';
import React from 'react';
import { useRecoilState } from 'recoil';
import { authService, dbService } from 'service/firebase';
import { loginUserState } from 'store/loginUser';
import styled from 'styled-components';

interface Props {}

const ResidentAuthContainer = (props: Props) => {
  const { onLoginStepNext } = useLoginStep();
  const { displayName }: any = authService.currentUser;

  const handleStepNext = () => {
    //TODO:인증 완료 됐다면
    try {
      onLoginStepNext();
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Wrapper>
      <Title>{displayName}님, 생활관 거주 인증을 해주세요!</Title>
      <Body>인증하기</Body>
      <Button onClick={handleStepNext}>다음</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 24px;
`;

const Body = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid black;
  margin: 5% auto;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.8em;

  @media ${({ theme }) => theme.size.mobile} {
    /* font-size: 1.5em; */
  }
`;

const Button = styled.div`
  width: 30%;
  border: 1px solid black;
  padding: 4px;
  margin: 0 auto;
`;

export default ResidentAuthContainer;
