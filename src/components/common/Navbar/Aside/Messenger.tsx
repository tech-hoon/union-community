import { Messenger as MsgIcon } from '@styled-icons/remix-line';
import styled from 'styled-components';

interface Props {}

const Messenger = (props: Props) => {
  return (
    <Wrapper>
      <MsgIcon size='26' />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  &:hover {
    transform: scale(120%);
  }
  cursor: pointer;
`;

export default Messenger;
