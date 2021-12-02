import { FormEventHandler, useRef, useState } from 'react';
import styled from 'styled-components';
import AvatarSelect from '../../Avatar/AvatarSelect';
import CustomInput from 'components/common/CustomInput';
import { addUser, verifyNickname } from 'api/user';
import { authService, firebaseApp } from 'service/firebase';
import { loginUserType } from 'types';
import { useSetRecoilState } from 'recoil';
import { loginUserState } from 'store/loginUser';
import { NICKNAME_LENGTH } from 'utils/config';

interface Props {}

const NicknameContainer = (prop: Props) => {
  const setLoginUser = useSetRecoilState(loginUserState);
  const [avatarId, setAvatarId] = useState<number>(1);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onAvatarIdPrev = () => setAvatarId((prev) => (prev <= 1 ? 10 - prev : prev - 1));
  const onAvatarIdNext = () => setAvatarId((prev) => (prev >= 10 ? (prev % 10) + 1 : prev + 1));

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const __value = event.target.value;
    if (!__value) {
      setErrorInfo('* 필수 입력 항목입니다.');
      return;
    }
    if (__value.length > NICKNAME_LENGTH) {
      setErrorInfo(`* ${NICKNAME_LENGTH}자 이하로 입력해주세요.`);
      return;
    }
    setErrorInfo(null);
  };

  const onClickSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const __value = inputRef?.current?.value;

    if (!__value || __value.length > NICKNAME_LENGTH) {
      setErrorInfo(
        !__value ? `입력값을 모두 입력해 주세요` : `${NICKNAME_LENGTH}자 이하로 입력해주세요`
      );
      return;
    }

    if (!(await verifyNickname(__value))) {
      setErrorInfo('* 이미 존재하는 닉네임입니다.');
      return;
    }

    try {
      const { displayName, email, uid }: any = authService.currentUser;
      const userData: loginUserType = {
        name: displayName,
        email,
        uid,
        avatar_id: avatarId,
        nickname: __value,
        like_list: [],
        post_list: [],
        created_at: new Date().getTime(),
        resident_auth_image: '',
      };

      addUser(userData);
      setLoginUser(userData);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Wrapper onSubmit={onClickSubmit}>
      <Title>사용하실 닉네임과 아바타를 선택해주세요.</Title>
      <Body>
        <AvatarWrapper>
          <AvatarSelect
            avatarId={avatarId}
            onClickPrev={onAvatarIdPrev}
            onClickNext={onAvatarIdNext}
          />
        </AvatarWrapper>
        <NicknameWrapper>
          <CustomInput label='닉네임' ref={inputRef} onChange={onChange} errorInfo={errorInfo} />
        </NicknameWrapper>
      </Body>
      <Button>시작하기</Button>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  padding: 24px;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.5em;
  line-height: 150%;
  margin-bottom: 24px;
`;

const Body = styled.div`
  margin: 0 auto 40px;
`;

const AvatarWrapper = styled.div`
  margin-bottom: 24px;
`;

const NicknameWrapper = styled.div`
  width: 100%;
`;

const Button = styled.button`
  font-weight: 500;
  font-size: 1em;

  padding: 8px 24px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background-color: #18a0fb;
  color: white;

  &:hover {
    transform: scale(105%);
  }
`;

export default NicknameContainer;
