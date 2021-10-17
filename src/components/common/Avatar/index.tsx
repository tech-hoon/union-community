import { memo } from 'react';
import styled from 'styled-components';
import Avatar1 from './Avatar1';
import Avatar2 from './Avatar2';
import Avatar3 from './Avatar3';
import Avatar4 from './Avatar4';
import Avatar5 from './Avatar5';
import Avatar6 from './Avatar6';
import Avatar7 from './Avatar7';
import Avatar8 from './Avatar8';
import Avatar9 from './Avatar9';
import Avatar10 from './Avatar10';

interface Props {
  avatarId: number;
  size?: number;
}

const CurrentAvatar = ({ avatarId }: Props) => {
  switch (avatarId) {
    case 1:
      return <Avatar1 />;
    case 2:
      return <Avatar2 />;
    case 3:
      return <Avatar3 />;
    case 4:
      return <Avatar4 />;
    case 5:
      return <Avatar5 />;
    case 6:
      return <Avatar6 />;
    case 7:
      return <Avatar7 />;
    case 8:
      return <Avatar8 />;
    case 9:
      return <Avatar9 />;
    case 10:
      return <Avatar10 />;
    default:
      return <></>;
  }
};

const Avatar = ({ avatarId, size }: Props) => {
  return (
    <Wrapper size={size}>
      <CurrentAvatar avatarId={avatarId} />
    </Wrapper>
  );
};

interface IWrapper {
  size?: number;
}

const Wrapper = styled.div<IWrapper>`
  border-radius: 50%;
  width: ${(props) => props.size || 32}px;
  height: ${(props) => props.size || 32}px;
  border: 0.3px solid #666;
  overflow: hidden;
`;

export default memo(Avatar);
