import styled from 'styled-components';
import S from 'components/common/Portal/AlertModal/Layouts';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';
import { UserType } from 'types';

interface Props {
  reciever: UserType;
  onCloseModal: () => void;
  onClickMenu: React.MouseEventHandler<HTMLElement>;
  isSecret: boolean;
}

const ReportModal = ({ reciever, onCloseModal, isSecret }: Props) => {
  const loginUser = useRecoilValue(loginUserState);

  return (
    <S.Wrapper>
      <S.Title>🚨 준비 중입니다.</S.Title>
    </S.Wrapper>
  );
};

export default ReportModal;

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
