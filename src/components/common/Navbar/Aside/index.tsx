import styled from 'styled-components';
import ProfileBox from '../../ProfileBox';
import { memo, MouseEventHandler } from 'react';
import { useHistory } from 'react-router';
import { Messenger } from '@styled-icons/remix-line';
import { Notifications } from '@styled-icons/ionicons-sharp';

const Aside = () => {
  const history = useHistory();

  const onClickButton: MouseEventHandler<HTMLElement> = (event) => {
    const id = (event.target as HTMLElement).id;

    switch (id) {
      case 'upload':
        history.push({ pathname: 'upload', state: { mode: 'add', initialPost: null } });
        break;
      case 'messenger':
        history.push({ pathname: '/messenger' });
        break;
      case 'notification':
        history.push({ pathname: '/notification' });
        break;

      default:
        break;
    }
  };

  return (
    <Wrapper onClick={onClickButton}>
      <NewPostBtn id='upload'>새 글 쓰기</NewPostBtn>
      <Notifications size='24px' id='notification' />
      <Messenger size='24px' id='messenger' />
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

const Button = styled.button``;

const MessengerBtn = styled(Messenger)`
  cursor: pointer;
`;

const NotificationBtn = styled(Notifications)`
  cursor: pointer;
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
