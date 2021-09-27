import { useState, useEffect } from 'react';
import { authService } from 'service/firebase';
import Routes from 'Routes';

interface Props {}

const App = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setLoginUser] = useState({});

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setLoginUser(user ? { displayName: user.displayName, uid: user.uid } : {});
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
