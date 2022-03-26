import ReceivedMessage from 'components/MyMessages/messages/ReceivedMessage';
import SentMessage from 'components/MyMessages/messages/SentMessage';
import styled from 'styled-components';
import { Layouts as S } from 'pages/MyPage/Layouts';
import { useState } from 'react';
import Messenger from 'assets/icons/Messenger';

import { UserType } from 'types';
import useModal from 'hooks/common/useModal';
import PortalContainer from 'components/common/Portal/PortalContainer';
import UserMenuModal from 'components/common/Portal/UserMenuModal';

const MyMessages = () => {
  const {
    modalOpened: userMenuOpened,
    onOpenModal: onOpenUserMenu,
    onCloseModal: onCloseUserMenu,
  } = useModal();

  const [menuId, setMenuId] = useState<string>('received');

  const [receiver, setReceiver] = useState<UserType>();
  const [isSecret, setIsSecret] = useState<boolean>(false);

  const onClickMenu: React.MouseEventHandler<HTMLElement> = (e) => {
    const id = (e.target as HTMLElement).id;
    setMenuId(id);
  };

  const onClickModal = (user: UserType, isSecret: boolean) => {
    setReceiver(user);
    setIsSecret(isSecret);
    onOpenUserMenu();
  };

  return (
    <S.Wrapper>
      <S.Navbar />
      <S.Container>
        <Header>
          <S.Title>
            <S.IconWrapper>
              <Messenger />
            </S.IconWrapper>
            나의 메시지
          </S.Title>
          <MenuBox onClick={onClickMenu}>
            <MenuButton id='received' isClicked={menuId === 'received'}>
              받은 메시지
            </MenuButton>
            <MenuButton id='sent' isClicked={menuId === 'sent'}>
              보낸 메시지
            </MenuButton>
          </MenuBox>
        </Header>
        <MessagesContainer>
          {menuId === 'received' ? (
            <ReceivedMessage onClickModal={onClickModal} />
          ) : (
            <SentMessage onClickModal={onClickModal} />
          )}
        </MessagesContainer>
      </S.Container>
      <S.Footer />

      {userMenuOpened && (
        <PortalContainer onClose={onCloseUserMenu}>
          <UserMenuModal
            reciever={receiver as UserType}
            onCloseModal={onCloseUserMenu}
            isSecret={isSecret}
          />
        </PortalContainer>
      )}
    </S.Wrapper>
  );
};

const MessagesContainer = styled.div`
  margin: 30px 20px;
`;

const Header = styled.div`
  margin: 30px 0px;
  display: flex;
  gap: 10px;
  align-items: center;

  @media ${({ theme }) => theme.size.mobile} {
    /* flex-direction: column; */
    /* align-items: baseline; */
    margin: 16px 4px;
  }
`;

const MenuBox = styled.h2`
  font-size: 1.2rem;
  color: gray;
  font-weight: 500;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1rem;
  }
`;

type MenuType = {
  isClicked: boolean;
};

const MenuButton = styled.button<MenuType>`
  font-size: 1.1rem;
  font-weight: ${({ isClicked }) => (isClicked ? 700 : 500)};
  color: ${({ isClicked, theme }) => (isClicked ? theme.color.main : 'gray')};
  margin: 0 4px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.85rem;
  }
`;

export default MyMessages;
