import { loginUserState } from 'store/loginUser';
import { useRecoilValue } from 'recoil';
import Routes from 'Routes';
import SEO from 'SEO';

interface Props {}

const App = (props: Props) => {
  const loginUser = useRecoilValue(loginUserState);
  const isLoggedIn = loginUser?.auth_status === 'approved';

  return (
    <>
      <SEO />
      <Routes isLoggedIn={isLoggedIn} />
    </>
  );
};

export default App;
