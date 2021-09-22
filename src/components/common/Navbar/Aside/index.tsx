import styled from 'styled-components';
import ProfileBox from '../../ProfileBox';
import LoginButton from './LoginButton';
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
          <LoginButton />
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

export default Aside;
