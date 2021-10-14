import useLoginStep from 'hooks/useLoginStep';
import React from 'react';
import { useRecoilState } from 'recoil';
import { dbService } from 'service/firebase';
import { loginUserState } from 'store/loginUser';
import styled from 'styled-components';

interface Props {}

const ResidentAuthContainer = (props: Props) => {
  const { onLoginStepNext } = useLoginStep();
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);

  const handleStepNext = () => {
    const _userData = { ...loginUser, residentAuthenticated: true };

    //인증 완료 됐다면
    try {
      dbService.doc(`users/${loginUser.uid}`).update(_userData);
      setLoginUser(_userData);
      onLoginStepNext();
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Wrapper>
      <Title>생활관 거주 인증을 해주세요!</Title>
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
  font-size: 2em;
`;

const Button = styled.div`
  width: 30%;
  border: 1px solid black;
  padding: 4px;
  margin: 0 auto;
`;

export default ResidentAuthContainer;
