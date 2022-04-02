import styled from 'styled-components';
import S from 'components/common/Portal/AlertModal/Layouts';

interface Props {
  onCloseModal: () => void;
}

const DoneModal = ({ onCloseModal }: Props) => {
  return (
    <Wrapper>
      <S.Title>전송되었습니다.</S.Title>
      <S.ButtonBox>
        <OkayButton onClick={onCloseModal}>확인</OkayButton>
      </S.ButtonBox>
    </Wrapper>
  );
};

const Wrapper = styled(S.Wrapper)`
  gap: 36px;
`;

const OkayButton = styled(S.OkayButton)`
  padding: 10px 20px;
  border-radius: 16px;
`;

export default DoneModal;
