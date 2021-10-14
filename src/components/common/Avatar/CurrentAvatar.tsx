import {
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  Avatar6,
  Avatar7,
  Avatar8,
  Avatar9,
  Avatar10,
} from '.';

interface Props {
  avatarId: number;
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

export default CurrentAvatar;
