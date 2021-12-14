import React from 'react';
import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
import { Layouts as S } from 'components/Mypage/Layouts';
import { Notifications } from '@styled-icons/ionicons-sharp';
import useNotification from 'hooks/comment/useNotification';
import CommentNotification from 'components/Notification/CommentNotification';
import MessageNofitication from 'components/Notification/MessageNofitication';

const Notification = () => {
  const { notification } = useNotification();

  return (
    <S.Wrapper>
      <S.Navbar />
      <S.Container>
        <S.Header>
          <S.Title>
            <Notifications size='30px' />
            알림
          </S.Title>
        </S.Header>
        <NotificationWrapper>
          {notification.length ? (
            notification.map((notification, key) =>
              notification.type === 'comment' ? (
                <CommentNotification notification={notification} key={key} />
              ) : (
                <MessageNofitication notification={notification} key={key} />
              )
            )
          ) : (
            <>소식이 없습니다</>
          )}
        </NotificationWrapper>
      </S.Container>
    </S.Wrapper>
  );
};

const NotificationWrapper = styled.section``;
const NotificationTitle = styled.h2``;
const NotificationContent = styled.h3``;

export default Notification;
