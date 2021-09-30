import React from 'react';
import styled from 'styled-components';

interface Props {
  onStepPrev: () => void;
  onStepNext: () => void;
}

const AuthContainer = ({ onStepPrev, onStepNext }: Props) => {
  return (
    <Wrapper>
      <Title>생활관 거주 인증을 해주세요!</Title>
      <Body>HELLO</Body>
      <Button onClick={onStepNext}>다음</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 24px;
`;

const Body = styled.div`
  /* margin: 20% 0; */
  display: flex;
  justify-content: space-around;
`;

const Title = styled.h1`
  margin-top: 5%;
  font-family: 'Spoqa Bold';
  font-size: 30px;
`;

const Button = styled.div`
  width: 30%;
  border: 1px solid black;
  padding: 4px;
  margin: 0 auto;
`;

export default AuthContainer;