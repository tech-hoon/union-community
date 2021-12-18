import styled from 'styled-components';
import { Layouts as S } from 'components/Mypage/Layouts';
import { Notifications } from '@styled-icons/ionicons-sharp';
import CommentNotification from 'components/MyNotification/CommentNotification';

const MyNotification = () => {
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
        </Header>
        <NotificationContainer>
          <CommentNotification />
        </NotificationContainer>
      </S.Container>
      <S.Footer />
    </S.Wrapper>
  );
};

const NotificationContainer = styled.ul`
  margin: 30px 20px;
`;

const Header = styled.div`
  margin: 30px 0px;
  display: flex;
  gap: 32px;
  align-items: center;

  @media ${({ theme }) => theme.size.mobile} {
    margin: 16px 4px;
    gap: 20px;
  }
`;

export default MyNotification;
