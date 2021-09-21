import { Bell } from '@styled-icons/boxicons-regular';
import styled from 'styled-components';

interface Props {}

const Notification = (props: Props) => {
  return (
    <Wrapper>
      <Bell size='26' />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  &:hover {
    transform: scale(120%);
  }
  cursor: pointer;
`;

export default Notification;
