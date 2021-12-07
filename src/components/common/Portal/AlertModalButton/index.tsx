import styled from 'styled-components';

interface Props {
  title: string;
  twoButton?: boolean;
  callback: <T>(t: T) => void;
  onCloseModal: () => void;
}

const AlertModalButton = ({ title, twoButton = false, callback, onCloseModal }: Props) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <ButtonBox>
        {twoButton && <CancelButton onClick={onCloseModal}>취소</CancelButton>}
        <OkayButton onClick={callback}>확인</OkayButton>
      </ButtonBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 350px;
  height: 200px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 36px;

  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  font-size: 1rem;
  height: 2rem;
  padding: 0 20px;
  border-radius: 4px;
`;

const OkayButton = styled(Button)`
  background-color: #262626;
  color: white;
`;
const CancelButton = styled(Button)`
  background-color: #e9ecef;
  color: black;
`;

export default AlertModalButton;
