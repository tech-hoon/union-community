import { useEffect } from 'react';
import { authService } from 'service/firebase';
import Routes from 'Routes';
import { registerStatus, loginUserState } from 'store/loginUser';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserData } from 'api/user';
import useLoginStep from 'hooks/useLoginStep';

interface Props {}

const App = (props: Props) => {
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  const isLoggedIn = useRecoilValue(registerStatus);
  const { onLoginStepReset, onLoginStepNext } = useLoginStep();

  const hasRegistered = async (uid: string) => {
    return await getUserData(uid);
  };

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (user) => {
      if (user) {
        const res = await hasRegistered(user.uid);
        if (res) {
          setLoginUser({ ...loginUser, ...res });
          return;
        }

        onLoginStepNext();
        return;
      }
    });

    return () => {
      onLoginStepReset();
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Routes isLoggedIn={isLoggedIn} />
    </>
  );
};

export default App;
