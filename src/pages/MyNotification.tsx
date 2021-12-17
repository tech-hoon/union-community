import styled from 'styled-components';
import { Layouts as S } from 'components/Mypage/Layouts';
import { Notifications } from '@styled-icons/ionicons-sharp';
import useNotification from 'hooks/useNotification';
import CommentNotification from 'components/MyNotification/CommentNotification';

const MyNotification = () => {
  const { notification, onDeleteAllNotification, onDeleteNotification } = useNotification();

  return (
    <S.Wrapper>
      <S.Navbar />
      <S.Container>
        <Header>
          <S.Title>
            <S.IconWrapper>
              <Notifications size='26px' />
            </S.IconWrapper>
            나의 알림
          </S.Title>
          {!!notification.length && (
            <DeleteAllButton onClick={onDeleteAllNotification}>모두 지우기</DeleteAllButton>
          )}
        </Header>
        <NotificationContainer>
          {notification.length ? (
            notification.map((notification, key) => (
              <CommentNotification
                notification={notification}
                key={key}
                onDelete={onDeleteNotification}
              />
            ))
          ) : (
            <S.Text>알림이 없습니다.</S.Text>
          )}
        </NotificationContainer>
      </S.Container>
      <S.Footer />
    </S.Wrapper>
  );
};

const NotificationContainer = styled.ul`
  margin: 30px 0;
`;

const Header = styled.div`
  margin: 30px 0px;
  display: flex;
  gap: 32px;
  align-items: center;

  @media ${({ theme }) => theme.size.mobile} {
    /* flex-direction: column; */
    /* align-items: baseline; */
    margin: 16px 4px;
    gap: 20px;
  }
`;

const DeleteAllButton = styled.button`
  font-size: 1rem;
  font-weight: bold;
  color: gray;
  padding: 0;
  margin: 0 0 0 auto;
`;

export default MyNotification;
