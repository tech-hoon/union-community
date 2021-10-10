import { useState, useEffect } from 'react';
import { authService } from 'service/firebase';
import Routes from 'Routes';
import { loginUserState } from 'store/loginUser';
import { useRecoilValue } from 'recoil';

interface Props {}

const App = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginUser = useRecoilValue(loginUserState);

  useEffect(() => {
    setIsLoggedIn(!!loginUser.isLoggedIn);
  }, [loginUser]);

  // useEffect(() => {
  //   authService.onAuthStateChanged((user) => {
  //     setLoginUser(
  //       user ? { displayName: user?.displayName!!, uid: user?.uid!! } : { displayName: '', uid: '' }
  //     );
  //     setIsLoggedIn(Boolean(user));
  //   });
  // }, []);

  return (
    <>
      <Routes isLoggedIn={isLoggedIn} />
    </>
  );
};

export default App;
