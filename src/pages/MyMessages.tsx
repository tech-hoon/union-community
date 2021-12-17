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
            <S.IconWrapper>
              <Messenger size='20px' />
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
          {menuId === 'received' ? <ReceivedMessage /> : <SentMessage />}
        </MessagesContainer>
      </S.Container>
      <S.Footer />
    </S.Wrapper>
  );
};

const MessagesContainer = styled.div`
  margin: 30px 0;
`;

const Header = styled.div`
  margin: 30px 0px;
  display: flex;
  gap: 16px;
  align-items: center;

  @media ${({ theme }) => theme.size.mobile} {
    /* flex-direction: column; */
    /* align-items: baseline; */
    margin: 16px 4px;
    gap: 20px;
  }
`;

const MenuBox = styled(S.Subtitle)``;

type MenuType = {
  isClicked: boolean;
};

const MenuButton = styled.button<MenuType>`
  font-size: 1.1rem;
  font-weight: ${({ isClicked }) => (isClicked ? 700 : 500)};
  color: ${({ isClicked, theme }) => (isClicked ? theme.color.MAIN : 'gray')};

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.85rem;
  }
`;

export default MyMessages;
