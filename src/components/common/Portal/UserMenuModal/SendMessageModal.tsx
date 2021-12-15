import { UserType } from 'types';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import S from 'components/common/Portal/AlertModal/Layouts';
import { sendMessage } from 'api/notification';

interface Props {
  reciever: UserType;
  onCloseModal: () => void;
  onClickMenu: React.MouseEventHandler<HTMLElement>;
  isSecret: boolean;
}

const SendMessageModal = ({ reciever, onCloseModal, onClickMenu, isSecret }: Props) => {
  const [value, setValue] = useState<string>();
  const [okayClicked, setOkayClicked] = useState<boolean>();

  const sender = useRecoilValue(loginUserState) as UserType;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <S.Input onChange={onChange} />
      <S.ButtonBox>
        <S.CancelButton onClick={onCloseModal}>취소</S.CancelButton>
        <S.OkayButton id='done' onClick={onClickOkayButton} disabled={!value}>
          확인
        </S.OkayButton>
      </S.ButtonBox>
    </Wrapper>
  );
};

const Wrapper = styled(S.Wrapper)`
  gap: 24px;
`;

export default SendMessageModal;
