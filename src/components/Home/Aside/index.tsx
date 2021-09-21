import styled from 'styled-components';
import ProfileBox from '../../common/ProfileBox';
import Messenger from './Messenger';
import Notification from './Notification';

interface Props {
  page: string;
}

const Aside = ({ page }: Props) => {
  return (
    <Wrapper>
      {page === 'Home' ? (
        <>
          <Notification />
          <Messenger />
          <ProfileBox />
        </>
      ) : (
        <>
          <Login>로그인</Login>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Login = styled.button``;

export default Aside;
