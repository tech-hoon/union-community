import useLoginStep from 'hooks/useLoginStep';
import LogoBox from 'components/common/LogoBox';
import { Layouts as S } from './Layouts';
import { NICKNAME_STEP, RESIDENT_AUTH_STEP, SNS_LOGIN_STEP, AUTH_WAITING_STEP } from 'utils/config';
import {
  SocialLoginContainer,
  ResidentAuthContainer,
  NicknameContainer,
  AuthWaitingContainer,
} from './LoginContainer';
import { loginUserState } from 'store/loginUser';
import { useRecoilValue } from 'recoil';

interface Props {
  onClose: () => void;
}

const LoginModal = ({ onClose }: Props) => {
  const { loginStep, onLoginStepPrev, onLoginStepReset } = useLoginStep();
  const loginUser = useRecoilValue(loginUserState);

  const CurrentContainer = () => {
    switch (loginStep) {
      case SNS_LOGIN_STEP:
        return <SocialLoginContainer />;
      case NICKNAME_STEP:
        return <NicknameContainer />;
      case RESIDENT_AUTH_STEP:
        return <ResidentAuthContainer />;
      case AUTH_WAITING_STEP:
        return <AuthWaitingContainer loginUser={loginUser} onLoginStepReset={onLoginStepReset} />;
      default:
        return null;
    }
  };

  return (
    <S.Wrapper>
      <S.Header>
        <LogoBox />
        <S.CloseBtn onClick={onClose} size='24' color='gray' />
      </S.Header>
      <S.Top>
        <S.BackButton onClick={onLoginStepPrev} step={loginStep}>
          &#xE000;
        </S.BackButton>
      </S.Top>
      <CurrentContainer />
    </S.Wrapper>
  );
};

export default LoginModal;
