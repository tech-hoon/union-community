import { useRecoilState } from 'recoil';
import { loginStepState } from 'store/loginStep';

const useLoginStep = () => {
  const [loginStep, setLoginStep] = useRecoilState(loginStepState);
  const onStepNext = () => setLoginStep((prevStep) => prevStep + 1);
  const onStepPrev = () => setLoginStep((prevStep) => prevStep - 1);
  const onStepReset = () => setLoginStep(0);

  return { loginStep, onStepNext, onStepPrev, onStepReset };
};

export default useLoginStep;
