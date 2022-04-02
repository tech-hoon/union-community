import { UserType } from 'types';
import { Envelope } from '@styled-icons/boxicons-regular';
import { toDateStringByFormating } from 'utils/date';
import styled from 'styled-components';
import S from 'components/NotificationLayout/Layouts';
import useSentMessage from 'hooks/message/useSentMessage';
import { urlParsingRegex } from 'utils/regex';
import PortalContainer from 'components/common/Portal/PortalContainer';
import AlertModal from 'components/common/Portal/AlertModal';
import useModal from 'hooks/common/useModal';
import KebabMenu from 'components/common/KebabMenu';

interface Props {
  onClickModal: (user: UserType, isSecret: boolean) => void;
}

const SentMessage = ({ onClickModal }: Props) => {
  const { messages, onDeleteMessage, onDeleteAllMessages } = useSentMessage();
  const { modalOpened, onOpenModal, onCloseModal } = useModal();
  return (
    <>
      {!!messages.length && (
        <S.DeleteAllButton onClick={onOpenModal}>모두 지우기</S.DeleteAllButton>
      )}

      <S.Wrapper>
        {messages.length ? (
          messages.map(
            ({ text, created_at, user, user: { nickname, uid }, is_secret, id }: any) => (
              <S.Message key={id} id={id}>
                <S.Row1>
                  <S.Title onClick={() => onClickModal(user, is_secret)}>
                    <small>{is_secret ? `익명${uid.slice(-2)}` : nickname}</small>
                    님에게 메시지를 보냈습니다.
                  </S.Title>
                  <KebabMenu>
                    {[
                      <S.DeleteBtn key={id} id={id} onClick={(e) => onDeleteMessage(e, uid)}>
                        삭제하기
                      </S.DeleteBtn>,
                    ]}
                  </KebabMenu>
                </S.Row1>
                <S.Row2>
                  <S.Content dangerouslySetInnerHTML={{ __html: urlParsingRegex(text) }} />
                </S.Row2>
                <S.Row3>
                  <S.CreatedAt>{toDateStringByFormating(created_at)}</S.CreatedAt>
                </S.Row3>
              </S.Message>
            )
          )
        ) : (
          <S.Text>보낸 메시지가 없습니다.</S.Text>
        )}
      </S.Wrapper>

      {/* 삭제 경고 모달 */}
      {modalOpened && (
        <PortalContainer onClose={onCloseModal}>
          <AlertModal
            title='메시지를 모두 삭제하시겠습니까?'
            twoButton={true}
            buttonLabels={['취소하기', '삭제하기']}
            callback={onDeleteAllMessages}
            onCloseModal={onCloseModal}
          />
        </PortalContainer>
      )}
    </>
  );
};

const Content = styled(S.Content)`
  margin: 4px 0;
`;

export default SentMessage;
