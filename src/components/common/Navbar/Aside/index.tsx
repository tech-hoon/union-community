import styled from 'styled-components';
import ProfileBox from '../../ProfileBox';
// import LoginButton from './LoginButton';
import NewPostButton from './NewPostButton';

interface Props {
  isLoggedIn: boolean;
}

const Aside = ({ isLoggedIn }: Props) => {
  return (
    <Wrapper>
      {isLoggedIn && (
        <>
          <NewPostButton />
          <ProfileBox />
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
