import React from 'react';
import styled from 'styled-components';
import SocialLogin from '../../SocialLogin/SocialLogin';

interface Props {
  onStepNext: () => void;
}

const LoginContainer = ({ onStepNext }: Props) => {
  return (
    <Wrapper>
      <Title>환영합니다!</Title>
      <Body>
        <SocialLogin name='google' />
        <SocialLogin name='facebook' />
      </Body>
      <Button onClick={onStepNext}>다음</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 24px;
`;

const Body = styled.div`
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

export default LoginContainer;
