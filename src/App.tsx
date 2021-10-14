import { useState, useEffect } from 'react';
import { authService, dbService } from 'service/firebase';
import Routes from 'Routes';
import { registerStatus, loginUserState } from 'store/loginUser';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserData } from 'api/user';
import useLoginStep from 'hooks/useLoginStep';
import { loginUserType } from 'types';

interface Props {}

const App = (props: Props) => {
  const [userData, setUserData] = useState<loginUserType>();
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  const isRegistered = useRecoilValue(registerStatus);
  const { onLoginStepReset, onLoginStepNext } = useLoginStep();

  useEffect(() => {
    const fetchUser = async (uid: string) => {
      const _userData: any = await getUserData(uid);
      setUserData((prev) => ({ ...prev, ..._userData }));
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
      }
    });

    return () => {
      onLoginStepReset();
      authService.signOut();
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
