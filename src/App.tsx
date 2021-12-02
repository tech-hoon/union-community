import { loginUserState } from 'store/loginUser';
import { useRecoilValue } from 'recoil';
import Routes from 'Routes';
import SEO from 'SEO';

interface Props {}

const App = (props: Props) => {
  const isLoggedIn = !!useRecoilValue(loginUserState);

  return (
    <>
      <SEO />
      <Routes isLoggedIn={isLoggedIn} />
    </>
  );
};

export default App;
