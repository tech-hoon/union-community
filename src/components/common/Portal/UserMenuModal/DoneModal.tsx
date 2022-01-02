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
        <S.OkayButton onClick={onCloseModal}>확인</S.OkayButton>
      </S.ButtonBox>
    </Wrapper>
  );
};

const Wrapper = styled(S.Wrapper)`
  gap: 36px;
`;

export default DoneModal;
