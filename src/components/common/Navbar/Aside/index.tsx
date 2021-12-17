import styled from 'styled-components';
import ProfileBox from '../../ProfileBox';
import { memo, MouseEventHandler } from 'react';
import { useHistory } from 'react-router';
import { Notifications } from '@styled-icons/ionicons-sharp';
import { Messenger } from '@styled-icons/bootstrap';
import { useRecoilState } from 'recoil';
import { newNotificationState } from 'store/notification';
import useNotification from 'hooks/useNotification';
import useReceivedMessage from 'hooks/message/useReceivedMessage';
import useLocalStorage from 'hooks/common/useLocalStorage';

const Aside = () => {
  const history = useHistory();
  // const [hasNewNotification, setHasNewNotification] = useRecoilState(newNotificationState);
  const { hasNewMessage, setHasNewMessage } = useReceivedMessage();
  const [hasNewMessageLS, setHasNewMessageLS] = useLocalStorage('has_new_message', false);

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
        // setHasNewNotification(false);
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
        <Messenger size='18px' color='black' id='messages' />
        {hasNewMessage && <NewAlarm />}
      </IconWrapper>

      <IconWrapper>
        <Notifications size='20px' color='black' id='notification' />
        {/* {hasNewNotification && <NewAlarm />} */}
      </IconWrapper>

      <ProfileBox />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  gap: 4px;
`;

const IconWrapper = styled.button`
  cursor: pointer;
  position: relative;
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
  font-size: 1em;
  color: black;

  @media ${({ theme }) => theme.size.mobileS} {
    font-size: 0.8em;
  }
`;

export default memo(Aside);
