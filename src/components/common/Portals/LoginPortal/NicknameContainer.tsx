import { FormEventHandler, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { dbService } from 'service/firebase';
import { loginUserState } from 'store/loginUser';
import { loginUserType } from 'types';
import styled from 'styled-components';
import AvatarSelect from './components/AvatarSelect';

interface Props {}

const NicknameContainer = (prop: Props) => {
  const [avatarId, setAvatarId] = useState(1);
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  const inputRef = useRef<any>(null);

  const onAvatarIdPrev = () => setAvatarId((prev) => (prev <= 1 ? 10 - prev : prev - 1));
  const onAvatarIdNext = () => setAvatarId((prev) => (prev >= 10 ? (prev % 10) + 1 : prev + 1));

  //TODO: 로그인 처리 로직
  const onClickSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    //TODO: 닉네임 유효성 검사
    const newUserData: loginUserType = {
      ...loginUser,
      avatarId: avatarId,
      nickname: inputRef.current?.value,
    };

    setLoginUser(newUserData);

    try {
      dbService.doc(`users/${newUserData.uid}`).update(newUserData);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Wrapper onSubmit={onClickSubmit}>
      {/* <Title>프로필을 설정해주세요 !</Title> */}
      <Body>
        <AvatarWrapper>
          <AvatarSelect
            avatarId={avatarId}
            onClickPrev={onAvatarIdPrev}
            onClickNext={onAvatarIdNext}
          />
        </AvatarWrapper>
        <NicknameWrapper>
          <Label>닉네임</Label>
          <Input ref={inputRef} />
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
  font-size: 2em;
  line-height: 150%;
`;

const Body = styled.div`
  margin: 0 auto 20px;
`;

const AvatarWrapper = styled.div``;

const NicknameWrapper = styled.div``;

const Label = styled.label`
  font-weight: 500;
  font-size: 1.5em;
  margin-right: 8px;
`;
const Input = styled.input`
  font-size: 1.5em;
  width: 300px;
  padding: 4px 8px;
  border: 0.1px solid #aaa;
  border-radius: 4px;
`;

const Button = styled.button`
  font-weight: 500;
  font-size: 1em;

  padding: 12px 28px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background-color: #18a0fb;
  color: white;

  &:hover {
    transform: scale(105%);
  }
`;

export default NicknameContainer;
