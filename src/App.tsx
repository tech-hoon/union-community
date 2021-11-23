import { loginStatus } from 'store/loginUser';
import { useRecoilValue } from 'recoil';
import Routes from 'Routes';

interface Props {}

const App = (props: Props) => {
  const isLoggedIn = useRecoilValue(loginStatus);

  return (
    <>
      <Routes isLoggedIn={isLoggedIn} />
    </>
  );
};

export default App;
