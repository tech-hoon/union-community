import { useState, useEffect } from 'react';
import { authService } from 'service/firebase';
import Routes from 'Routes';
import { registerStatus, loginUserState } from 'store/loginUser';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { getUserData } from 'api/user';
import useLoginStep from 'hooks/useLoginStep';
import { loginUserType } from 'types';

interface Props {}

const App = (props: Props) => {
  const [userData, setUserData] = useState<loginUserType>();
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  const resetLoginUser = useResetRecoilState(loginUserState);
  const isRegistered = useRecoilValue(registerStatus);
  const { onLoginStepReset, onLoginStepNext } = useLoginStep();

  useEffect(() => {
    const fetchUser = async (uid: string) => {
      const _userData: any = await getUserData(uid);
      setUserData({ ..._userData });
    };

    authService.onAuthStateChanged((user) => {
      if (user) {
        fetchUser(user.uid);
        setLoginUser((prev) => ({
          ...prev,
          name: user.displayName!!,
          email: user.email!!,
          uid: user.uid,
        }));
      } else resetLoginUser();
    });

    return () => {
      onLoginStepReset();
    };
  }, []);

  useEffect(() => {
    if (userData) {
      setLoginUser(userData);
    }
  }, [userData]);

  return (
    <>
      <Routes isLoggedIn={isRegistered} />
    </>
  );
};

export default App;
