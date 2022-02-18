import S from './Layouts';

interface Props {
  title: string;
  twoButton?: boolean;
  callback?: () => void;
  onCloseModal: () => void;
}

const AlertModal = ({ title, twoButton = false, callback, onCloseModal }: Props) => {
  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      <S.ButtonBox>
        {twoButton && <S.CancelButton onClick={onCloseModal}>취소</S.CancelButton>}
        <S.OkayButton
          onClick={() => {
            callback && callback();
            onCloseModal();
          }}
        >
          확인
        </S.OkayButton>
      </S.ButtonBox>
    </S.Wrapper>
  );
};

export default AlertModal;
