import styled from 'styled-components';
import AvatarSelect from 'components/common/Avatar/AvatarSelect';
import CustomInput from 'components/common/CustomInput';
import { useRef, useState } from 'react';
import { Layouts as S } from 'pages/MyPage/Layouts';
import { SettingsOutline } from '@styled-icons/evaicons-outline';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginUserState } from 'store/loginUser';
import { useHistory } from 'react-router';
import { updateProfile, verifyNickname } from 'api/user';
import { LoginUserType } from 'types';
import { NICKNAME_LENGTH } from 'utils/config';
import { nicknameRegex } from 'utils/regex';

const Setting = () => {
  const user = useRecoilValue(loginUserState) as LoginUserType;
  const setLoginUser = useSetRecoilState(loginUserState);
  const [avatarId, setAvatarId] = useState<number>(user.avatar_id);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  const onAvatarIdPrev = () => setAvatarId((prev) => (prev <= 1 ? 10 : prev - 1));
  const onAvatarIdNext = () => setAvatarId((prev) => (prev >= 10 ? (prev % 10) + 1 : prev + 1));

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const __value = event.target.value;
    if (!__value) {
      setErrorInfo('* 필수 입력 항목입니다.');
      return;
    }

    if (!nicknameRegex(__value)) {
      setErrorInfo('* 사용할 수 없는 닉네임입니다.');
      return;
    }

    if (__value.length > NICKNAME_LENGTH) {
      setErrorInfo(`* ${NICKNAME_LENGTH}자 이하로 입력해주세요.`);
      return;
    }
    setErrorInfo(null);
  };

  const onCancel = () => history.push('/home');

  const onSubmit = async () => {
    const __value = inputRef?.current?.value as string;
    const newData = { uid: user.uid, nickname: __value, avatar_id: avatarId };

    if (user.avatar_id === avatarId && user.nickname === __value) {
      history.push('/home');
      return;
    }

    if (user.nickname !== __value && !(await verifyNickname(__value))) {
      setErrorInfo('* 이미 존재하는 닉네임입니다.');
      return;
    }

    updateProfile(newData);
    setLoginUser({ ...user, ...newData });

    history.push({
      pathname: '/home',
      state: 'profileUpdated',
    });
  };

  return (
    <S.Wrapper>
      <S.Navbar />
      <S.Container>
        <S.Header>
          <S.Title>
            <SettingsOutline size='30px' />
            나의 정보 수정
          </S.Title>
          {/* <S.Subtitle>* 닉네임은 1회만 변경 가능합니다.</S.Subtitle> */}
        </S.Header>
        <Body>
          <AvatarSelect
            onClickNext={onAvatarIdNext}
            onClickPrev={onAvatarIdPrev}
            avatarId={avatarId}
            size={`80%`}
          />
          <NicknameWrapper>
            <CustomInput
              label='닉네임'
              defaultValue={user.nickname}
              onChange={onChange}
              errorInfo={errorInfo}
              ref={inputRef}
            />
          </NicknameWrapper>
          <ButtonWrapper>
            <CancleButton onClick={onCancel}>취소</CancleButton>
            <SubmitButton onClick={onSubmit} disabled={!!errorInfo}>
              완료
            </SubmitButton>
          </ButtonWrapper>
          {/* <DeleteButton>회원 탈퇴</DeleteButton> */}
        </Body>
      </S.Container>
      <S.Footer />
    </S.Wrapper>
  );
};

const Body = styled.div`
  width: 100%;
  margin: 80px auto;
`;

const NicknameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  line-height: 1;
  margin-top: 32px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 32px 0;
  gap: 16px;
`;

const CancleButton = styled(S.Button)`
  background-color: #888;
`;

const SubmitButton = styled(S.Button)`
  background-color: black;

  &:disabled {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: not-allowed;
  }
`;
const DeleteButton = styled(S.Button)`
  background-color: #f77;
  float: right;
  bottom: 0px;
`;

export default Setting;
