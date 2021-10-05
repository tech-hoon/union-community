import { useState, useEffect } from 'react';
import { authService } from 'service/firebase';
import Routes from 'Routes';
import { loginUserState } from 'store/loginUser';
import { useRecoilState } from 'recoil';

interface Props {}

const App = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setLoginUser] = useRecoilState(loginUserState);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setLoginUser(user ? { displayName: user?.displayName!!, uid: user?.uid!! } : {});
      setIsLoggedIn(Boolean(user));
    });
  }, []);

  return (
    <>
      <Routes isLoggedIn={isLoggedIn} />
    </>
  );
};

export default App;
