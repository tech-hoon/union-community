import styled from 'styled-components';
import ProfileBox from '../../ProfileBox';
import { memo, MouseEventHandler } from 'react';
import { useHistory } from 'react-router';
import Bell from 'assets/icons/Bell';
import Messenger from 'assets/icons/Messenger';

import useReceivedMessage from 'hooks/message/useReceivedMessage';
import useNotification from 'hooks/useNotification';

const Aside = () => {
  const history = useHistory();
  const { hasNewMessage, setHasNewMessage, setHasNewMessageLS } = useReceivedMessage();
  const { hasNewNotification, setHasNewNotification, setHasNewNotificationLS } = useNotification();

  const onClickButton: MouseEventHandler<HTMLElement> = (event) => {
    const id = (event.target as HTMLElement).id;

    switch (id) {
      case 'messages':
        setHasNewMessage(false);
        setHasNewMessageLS(false);
        history.push({ pathname: '/messages' });
        break;

      case 'notifications':
        setHasNewNotification(false);
        setHasNewNotificationLS(false);
        history.push({ pathname: '/notifications' });
        break;

      default:
        break;
    }
  };

  return (
    <Wrapper onClick={onClickButton}>
      <IconWrapper>
        <Messenger id='messages' />
        {hasNewMessage && <NewBadge />}
      </IconWrapper>

      <IconWrapper>
        <Bell id='notifications' />
        {hasNewNotification && <NewBadge />}
      </IconWrapper>

      <ProfileBox />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  gap: 20px;
`;

const IconWrapper = styled.button`
  cursor: pointer;
  position: relative;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: scale(108%);
    }
  }
`;

const NewBadge = styled.div`
  position: absolute;
  background-color: red;
  border-radius: 50%;
  width: 5px;
  height: 5px;
  top: -4px;
  right: -2.5px;
`;

export default memo(Aside);
