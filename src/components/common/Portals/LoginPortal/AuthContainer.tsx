import useLoginStep from 'hooks/useLoginStep';
import React from 'react';
import styled from 'styled-components';

interface Props {}

const AuthContainer = (props: Props) => {
  const { onStepNext } = useLoginStep();

  return (
    <Wrapper>
      <Title>생활관 거주 인증을 해주세요!</Title>
      <Body>인증하기</Body>
      <Button onClick={onStepNext}>다음</Button>
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
  font-family: 'Spoqa Bold';
  font-size: 2em;
`;

const Button = styled.div`
  width: 30%;
  border: 1px solid black;
  padding: 4px;
  margin: 0 auto;
`;

export default AuthContainer;
