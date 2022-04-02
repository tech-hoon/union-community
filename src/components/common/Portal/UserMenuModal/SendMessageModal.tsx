import { UserType } from 'types';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import S from 'components/common/Portal/AlertModal/Layouts';
import { sendMessage } from 'api/message';

interface Props {
  reciever: UserType;
  onCloseModal: () => void;
  onClickMenu: React.MouseEventHandler<HTMLElement>;
  isSecret: boolean;
}

const SendMessageModal = ({ reciever, onCloseModal, onClickMenu, isSecret }: Props) => {
  const [value, setValue] = useState<string>();
  const sender = useRecoilValue(loginUserState) as UserType;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = async () => {
    value && (await sendMessage(reciever.uid, sender.uid, value, new Date().getTime(), isSecret));
  };

  const onClickOkayButton: React.MouseEventHandler<HTMLElement> = (e) => {
    onSubmit();
    onClickMenu(e);
  };

  return (
    <Wrapper>
      <S.Title>
        <small>{isSecret ? `익명${reciever.uid.slice(-2)}` : reciever.nickname}</small>님에게 메시지
        보내기
      </S.Title>
      <TextareaWrapper>
        <Textarea onChange={onChange} />
      </TextareaWrapper>
      <S.ButtonBox>
        <S.CancelButton onClick={onCloseModal}>취소하기</S.CancelButton>
        <S.OkayButton id='done' onClick={onClickOkayButton} disabled={!value}>
          메시지 보내기
        </S.OkayButton>
      </S.ButtonBox>
    </Wrapper>
  );
};

const Wrapper = styled(S.Wrapper)`
  gap: 8px;
  height: 300px;
  padding: 20px;
`;

const TextareaWrapper = styled.div`
  width: 100%;
`;

const Textarea = styled(S.Textarea)`
  height: 120px;
`;

export default SendMessageModal;
