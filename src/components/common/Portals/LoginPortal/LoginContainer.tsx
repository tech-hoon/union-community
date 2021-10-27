import { memo } from 'react';
import useLoginStep from 'hooks/useLoginStep';
import styled from 'styled-components';
import SocialLogin from '../../SocialLogin/SocialLogin';
import { RESIDENT_AUTH_STEP, NICKNAME_STEP } from 'utils/config';

interface Props {}

const LoginContainer = (prop: Props) => {
  const { loginStep, onLoginStepNext } = useLoginStep();

  return (
    <Wrapper>
      <Title>환영합니다!</Title>
      <Body>
        <SocialLogin name='google' />
        <SocialLogin name='facebook' />
      </Body>
      {(loginStep === RESIDENT_AUTH_STEP || loginStep === NICKNAME_STEP) && (
        <Button onClick={onLoginStepNext}>다음</Button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 24px;
`;

const Body = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 5% 0;
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

export default memo(LoginContainer);
