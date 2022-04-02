import S from './Layouts';

interface Props {
  title: string;
  twoButton?: boolean;
  buttonLabels?: string[];
  callback?: () => void;
  onCloseModal: () => void;
}

const AlertModal = ({
  title,
  twoButton = false,
  callback,
  onCloseModal,
  buttonLabels = ['취소', '확인'],
}: Props) => {
  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      <S.ButtonBox>
        {twoButton && <S.CancelButton onClick={onCloseModal}>{buttonLabels[0]}</S.CancelButton>}
        <S.OkayButton
          onClick={() => {
            callback && callback();
            onCloseModal();
          }}
        >
          {buttonLabels[1]}
        </S.OkayButton>
      </S.ButtonBox>
    </S.Wrapper>
  );
};

export default AlertModal;
