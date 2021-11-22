import { useRecoilState } from 'recoil';
import { loginStepState } from 'store/loginStep';

const useLoginStep = () => {
  const [loginStep, setLoginStep] = useRecoilState(loginStepState);
  const onLoginStepNext = () => setLoginStep((prevStep) => prevStep + 1);
  const onLoginStepPrev = () => setLoginStep((prevStep) => prevStep - 1);
  const onLoginStepReset = () => setLoginStep(1);

  return { loginStep, onLoginStepNext, onLoginStepPrev, setLoginStep, onLoginStepReset };
};

export default useLoginStep;
