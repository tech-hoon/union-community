import { UserType } from 'types';
import { useState } from 'react';
import styled from 'styled-components';
import S from 'components/common/Portal/AlertModal/Layouts';
import ReportModal from './ReportModal';
import SendMessageModal from './SendMessageModal';
import Avatar from 'components/common/Avatar';
import DoneModal from './DoneModal';

interface Props {
  reciever: UserType;
  onCloseModal: () => void;
  isSecret: boolean;
}

const UserMenuModal = ({ reciever, onCloseModal, isSecret }: Props) => {
  const [menuId, setMenuId] = useState<string | null>();

  const onClickMenu: React.MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    const id = (e.target as HTMLElement).id;
    setMenuId(id);
  };

  switch (menuId) {
    default:
      return (
        <Wrapper>
          <Header>
            <Avatar avatarId={isSecret ? -1 : reciever.avatar_id} />
            <small>{isSecret ? `익명${reciever.uid.slice(-2)}` : reciever.nickname}</small>
          </Header>
          <S.ButtonBox onClick={onClickMenu}>
            <ReportButton id='report'>신고하기</ReportButton>
            <MessageButton id='message'>메시지 보내기</MessageButton>
          </S.ButtonBox>
        </Wrapper>
      );

    case 'report':
      return (
        <ReportModal
          reciever={reciever}
          onCloseModal={onCloseModal}
          isSecret={isSecret}
          onClickMenu={onClickMenu}
        />
      );
    case 'message':
      return (
        <SendMessageModal
          reciever={reciever}
          onCloseModal={onCloseModal}
          isSecret={isSecret}
          onClickMenu={onClickMenu}
        />
      );
    case 'done':
      return <DoneModal onCloseModal={onCloseModal} />;
  }
};

const Wrapper = styled(S.Wrapper)`
  gap: 24px;
`;

const Header = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ReportButton = styled(S.CancelButton)`
  background-color: transparent;
  border: 1px solid red;
  border-radius: 4px;
  color: red;
`;

const MessageButton = styled(S.CancelButton)`
  background-color: black;
  color: white;
`;

export default UserMenuModal;
