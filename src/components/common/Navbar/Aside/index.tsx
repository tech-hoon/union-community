import styled from 'styled-components';
import ProfileBox from '../../ProfileBox';
import { memo, MouseEventHandler } from 'react';
import { useHistory } from 'react-router';
import { Notifications } from '@styled-icons/ionicons-sharp';
import { useRecoilState } from 'recoil';
import { newNotificationState } from 'store/notification';

const Aside = () => {
  const history = useHistory();
  const [hasNewNotification, setHasNewNotification] = useRecoilState(newNotificationState);

  const onClickButton: MouseEventHandler<HTMLElement> = (event) => {
    const id = (event.target as HTMLElement).id;

    switch (id) {
      case 'upload':
        history.push({ pathname: '/upload', state: { mode: 'add', initialPost: null } });
        break;

      case 'notification':
        setHasNewNotification(false);
        history.push({ pathname: '/notification' });
        break;

      default:
        break;
    }
  };

  return (
    <Wrapper onClick={onClickButton}>
      <NewPostBtn id='upload'>새 글 쓰기</NewPostBtn>
      <NotificationWrapper id='notification'>
        <Notifications size='24px' id='notification' />
        {hasNewNotification && <NewNotification />}
      </NotificationWrapper>
      <ProfileBox />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
`;

const NotificationWrapper = styled.button`
  cursor: pointer;
  position: relative;
`;

const NewNotification = styled.div`
  position: absolute;
  background-color: red;
  border-radius: 50%;
  width: 4px;
  height: 4px;
  top: 0px;
  right: 4px;
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
