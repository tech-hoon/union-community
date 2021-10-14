import styled from 'styled-components';
import { memo } from 'react';
import CurrentAvatar from '../Avatar/CurrentAvatar';

interface Props {
  avatarId: number;
}

const Avatar = ({ avatarId }: Props) => {
  return (
    <Wrapper>
      <CurrentAvatar avatarId={avatarId} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  border: 0.3px solid #666;
  overflow: hidden;
`;

export default memo(Avatar);
