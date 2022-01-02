import styled from 'styled-components';
import S from 'components/common/Portal/AlertModal/Layouts';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';
import { UserType } from 'types';
import { useState } from 'react';
import { REPORT_LIST } from 'utils/config';

interface Props {
  reciever: UserType;
  onCloseModal: () => void;
  onClickMenu: React.MouseEventHandler<HTMLElement>;
  isSecret: boolean;
}

const ReportModal = ({ reciever, onCloseModal, onClickMenu, isSecret }: Props) => {
  const [value, setValue] = useState<string>();
  const loginUser = useRecoilValue(loginUserState);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = async () => {
    // API 호출
  };

  const onClickOkayButton: React.MouseEventHandler<HTMLElement> = () => {
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
        <Select>
          {REPORT_LIST.map((item, key) => (
            <Option key={key}>{item}</Option>
          ))}
        </Select>
      </SelectWrapper>
      <InputWrapper>
        <Label>내용</Label>
        <Input onChange={onChange} spellCheck='false' />
      </InputWrapper>
      a
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
`;

const Option = styled.option``;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1rem;
`;

const Input = styled.textarea`
  width: 80%;
  font-size: 0.8rem;
  height: 2rem;
  padding: 4px;

  background: none;
  border: 1px solid #555;
  overflow: auto;
  outline: none;
  resize: none;
`;

export default ReportModal;
