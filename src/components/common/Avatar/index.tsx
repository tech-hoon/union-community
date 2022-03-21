import { memo } from 'react';
import styled from 'styled-components';
import {
  DefaultAvatar,
  Avatar101,
  Avatar102,
  Avatar103,
  Avatar104,
  Avatar105,
  Avatar106,
  Avatar107,
  Avatar108,
  Avatar109,
  Avatar110,
  Avatar111,
  Avatar112,
  Avatar201,
  Avatar202,
  Avatar203,
  Avatar204,
  Avatar205,
  Avatar206,
  Avatar207,
  Avatar208,
  Avatar209,
  Avatar210,
  Avatar211,
  Avatar212,
} from './AvatarList';

interface Props {
  avatarId: number;
  size?: number;
}

const Avatar = ({ avatarId, size }: Props) => {
  const MaleAvatarHandler = {
    0: <DefaultAvatar color='#18A0FB' />,
    '-1': <DefaultAvatar />,

    1: <Avatar101 />,
    2: <Avatar102 />,
    3: <Avatar103 />,
    4: <Avatar104 />,
    5: <Avatar105 />,

    101: <Avatar101 />,
    102: <Avatar102 />,
    103: <Avatar103 />,
    104: <Avatar104 />,
    105: <Avatar105 />,
    106: <Avatar106 />,
    107: <Avatar107 />,
    108: <Avatar108 />,
    109: <Avatar109 />,
    110: <Avatar110 />,
    111: <Avatar111 />,
    112: <Avatar112 />,
  }[avatarId];

  const FemaleAvatarHandler = {
    6: <Avatar201 />,
    7: <Avatar202 />,
    8: <Avatar203 />,
    9: <Avatar204 />,
    10: <Avatar205 />,

    201: <Avatar201 />,
    202: <Avatar202 />,
    203: <Avatar203 />,
    204: <Avatar204 />,
    205: <Avatar205 />,
    206: <Avatar206 />,
    207: <Avatar207 />,
    208: <Avatar208 />,
    209: <Avatar209 />,
    210: <Avatar210 />,
    211: <Avatar211 />,
    212: <Avatar212 />,
  }[avatarId];

  const AvatarHandler = () => {
    if ((avatarId >= -1 && avatarId <= 5) || (avatarId > 100 && avatarId < 200)) {
      return MaleAvatarHandler;
    } else return FemaleAvatarHandler;
  };

  return (
    <Wrapper size={size} avatarId={avatarId}>
      {AvatarHandler()}
    </Wrapper>
  );
};

interface IWrapper {
  size?: number;
  avatarId: number;
}

const Wrapper = styled.div<IWrapper>`
  border-radius: 50%;
  width: ${(props) => props.size || 30}px;
  height: ${(props) => props.size || 30}px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ avatarId }) => (avatarId === 0 ? '#18A0FB' : '#F1F3F5')};
  background-color: white;
  overflow: hidden;
`;

export default memo(Avatar);
