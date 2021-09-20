import styled from 'styled-components';
import ProfileBox from '../ProfileBox';
import Messenger from './Messenger';
import Notification from './Notification';

interface Props {}

const Aside = (props: Props) => {
  return (
    <Wrapper>
      <Notification />
      <Messenger />
      <ProfileBox />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default Aside;
