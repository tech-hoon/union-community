import styled from 'styled-components';
import S from 'components/common/Portal/AlertModal/Layouts';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';
import { UserType } from 'types';
import { useState } from 'react';
import { REPORT_LIST } from 'utils/config';
import { reportUser } from 'api/report';

interface Props {
  reciever: UserType;
  onCloseModal: () => void;
  onClickMenu: React.MouseEventHandler<HTMLElement>;
  isSecret: boolean;
}

const ReportModal = ({ reciever, onCloseModal, onClickMenu, isSecret }: Props) => {
  const [type, setType] = useState<string>();
  const [content, setContent] = useState<string>();

  const loginUser = useRecoilValue(loginUserState) as UserType;

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as string);
  };

  const onSubmit = async () => {
    if (!type || !content) {
      return;
    }

    await reportUser({
      reportee: reciever,
      reporter: loginUser,
      type,
      content,
      created_at: new Date().getTime(),
    });
  };

  const onClickOkayButton: React.MouseEventHandler<HTMLElement> = (e) => {
    onSubmit();
    onClickMenu(e);
  };

  return (
    <Wrapper>
      <S.Title>
        🚨<small>{isSecret ? `익명${reciever.uid.slice(-2)}` : reciever.nickname}</small> 신고하기
      </S.Title>
      <SelectWrapper>
        <Label>종류</Label>
        <Select onChange={onChangeType} defaultValue={''}>
          <Option disabled value=''>
            신고 유형을 선택해주세요
          </Option>
          {REPORT_LIST.map((item, key) => (
            <Option key={key}>{item}</Option>
          ))}
        </Select>
      </SelectWrapper>
      <InputWrapper>
        <Label>내용</Label>
        <Input onChange={onChangeContent} spellCheck='false' />
      </InputWrapper>
      <S.ButtonBox>
        <S.CancelButton onClick={onCloseModal}>취소</S.CancelButton>
        <S.OkayButton id='done' onClick={onClickOkayButton} disabled={!content || !type}>
          신고하기
        </S.OkayButton>
      </S.ButtonBox>
    </Wrapper>
  );
};

const Wrapper = styled(S.Wrapper)`
  height: auto;
  gap: 24px;
`;

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1rem;
`;

const Label = styled.label`
  font-size: 0.8rem;
`;

const Select = styled.select`
  width: 80%;

  font-size: 0.8rem;
  padding: 2px;
  color: chocolate;
`;

const Option = styled.option`
  text-align: center;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1rem;

  & Label {
    padding-top: 6px;
    align-self: flex-start;
  }
`;

const Input = styled.textarea`
  width: 80%;
  font-size: 0.8rem;
  height: 4rem;
  padding: 4px;

  background: none;
  border: 1px solid #555;
  overflow: auto;
  outline: none;
  resize: none;
`;

export default ReportModal;
