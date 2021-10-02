import useLoginStep from 'hooks/useLoginStep';
import styled from 'styled-components';
import SocialLogin from '../../SocialLogin/SocialLogin';

interface Props {}

const SNS_LOGIN_STEP = 1;
const AUTH_STEP = 2;
const NICKNAME_STEP = 3;

const LoginContainer = (prop: Props) => {
  const { loginStep, onStepNext } = useLoginStep();

  return (
    <Wrapper>
      <Title>환영합니다!</Title>
      <Body>
        <SocialLogin name='google' />
        <SocialLogin name='facebook' />
      </Body>
      {(loginStep === AUTH_STEP || loginStep === NICKNAME_STEP) && (
        <Button onClick={onStepNext}>다음</Button>
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
  font-family: 'Spoqa Bold';
  font-size: 2em;
`;

const Button = styled.div`
  width: 30%;
  border: 1px solid black;
  padding: 4px;
  margin: 0 auto;
`;

export default LoginContainer;
