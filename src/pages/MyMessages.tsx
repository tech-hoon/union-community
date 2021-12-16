import ReceivedMessage from 'components/MyMessages/messages/ReceivedMessage';
import SentMessage from 'components/MyMessages/messages/SentMessage';
import styled from 'styled-components';
import { Layouts as S } from 'components/Mypage/Layouts';
import { useState } from 'react';
import { Messenger } from '@styled-icons/bootstrap';

const MyMessages = () => {
  const [menuId, setMenuId] = useState<string>('received');

  const onClickMenu: React.MouseEventHandler<HTMLElement> = (e) => {
    const id = (e.target as HTMLElement).id;
    setMenuId(id);
  };

  return (
    <S.Wrapper>
      <S.Navbar />
      <S.Container>
        <Header>
          <S.Title>
            <IconWrapper>
              <Messenger size='24px' />
            </IconWrapper>
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
          {menuId === 'received' ? <ReceivedMessage /> : <SentMessage />}
        </MessagesContainer>
      </S.Container>
    </S.Wrapper>
  );
};

const MessagesContainer = styled.section`
  margin: 30px 0;
`;

const Header = styled.div`
  margin: 30px 20px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuBox = styled(S.Subtitle)``;

type MenuType = {
  isClicked: boolean;
};

const MenuButton = styled.button<MenuType>`
  font-size: 1.1rem;
  font-weight: ${({ isClicked }) => (isClicked ? 700 : 500)};
  color: ${({ isClicked, theme }) => (isClicked ? theme.color.MAIN : 'gray')};
`;

export default MyMessages;
