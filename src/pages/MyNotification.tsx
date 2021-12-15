import styled from 'styled-components';
import { Layouts as S } from 'components/Mypage/Layouts';
import { Notifications } from '@styled-icons/ionicons-sharp';
import useNotification from 'hooks/comment/useNotification';
import CommentNotification from 'components/Notification/CommentNotification';
import MessageNofitication from 'components/Notification/MessageNofitication';

const MyNotification = () => {
  const { notification, onDeleteAllNotification, onDeleteNotification } = useNotification();

  return (
    <S.Wrapper>
      <S.Navbar />
      <S.Container>
        <Header>
          <S.Title>
            <Notifications size='30px' />
            나의 알림
          </S.Title>
          {!!notification.length && (
            <DeleteAllButton onClick={onDeleteAllNotification}>모두 지우기</DeleteAllButton>
          )}
        </Header>
        <NotificationContainer>
          {notification.length ? (
            notification.map((notification, key) =>
              notification.type === 'comment' ? (
                <CommentNotification
                  notification={notification}
                  key={key}
                  onDelete={onDeleteNotification}
                />
              ) : (
                <MessageNofitication
                  notification={notification}
                  key={key}
                  onDelete={onDeleteNotification}
                />
              )
            )
          ) : (
            <Text>알림이 없습니다.</Text>
          )}
        </NotificationContainer>
      </S.Container>
    </S.Wrapper>
  );
};

const NotificationContainer = styled.section`
  margin: 30px 0;
`;

const Header = styled.div`
  margin: 30px 20px;
  display: flex;
  gap: 32px;
  align-items: center;
`;

const Text = styled.div`
  margin: 40px 30px;
  font-size: 1.1rem;
`;

const DeleteAllButton = styled.button`
  font-size: 1rem;
  font-weight: bold;
  color: gray;
  padding: 0;
  margin: 0 0 0 auto;
`;

export default MyNotification;
