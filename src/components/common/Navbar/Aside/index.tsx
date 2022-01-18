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
      case 'upload':
        history.push({ pathname: '/upload', state: { mode: 'add', initialPost: null } });
        break;

      case 'messages':
        setHasNewMessage(false);
        setHasNewMessageLS(false);
        history.push({ pathname: '/messages' });
        break;

      case 'notification':
        setHasNewNotification(false);
        setHasNewNotificationLS(false);
        history.push({ pathname: '/notification' });
        break;

      default:
        break;
    }
  };

  return (
    <Wrapper onClick={onClickButton}>
      <NewPostBtn id='upload'>새 글 쓰기</NewPostBtn>

      <IconWrapper>
        <Bell id='notification' />
        {hasNewNotification && <NewAlarm />}
      </IconWrapper>

      <IconWrapper>
        <Messenger id='messages' />
        {hasNewMessage && <NewAlarm />}
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

  @media ${({ theme }) => theme.size.mobileS} {
    gap: 3.2px;
  }
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

const NewAlarm = styled.div`
  position: absolute;
  background-color: red;
  border-radius: 50%;
  width: 5px;
  height: 5px;
  top: -3px;
  right: 3px;
`;

const NewPostBtn = styled.button`
  font-weight: 500;
  font-size: 0.9rem;
  margin-top: 1px;
  color: black;

  @media ${({ theme }) => theme.size.mobileS} {
    font-size: 0.7em;
  }
`;

export default memo(Aside);
