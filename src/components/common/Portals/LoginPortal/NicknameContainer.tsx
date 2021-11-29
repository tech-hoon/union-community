import { FormEventHandler, useRef, useState } from 'react';
import styled from 'styled-components';
import AvatarSelect from './components/AvatarSelect';
import { addUser } from 'api/user';
import { authService, firebaseApp } from 'service/firebase';
import { loginUserType } from 'types';
import { useSetRecoilState } from 'recoil';
import { loginUserState } from 'store/loginUser';

interface Props {}

const NicknameContainer = (prop: Props) => {
  const setLoginUser = useSetRecoilState(loginUserState);
  const [avatarId, setAvatarId] = useState<number>(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const onAvatarIdPrev = () => setAvatarId((prev) => (prev <= 1 ? 10 - prev : prev - 1));
  const onAvatarIdNext = () => setAvatarId((prev) => (prev >= 10 ? (prev % 10) + 1 : prev + 1));

  //TODO: 로그인 처리 로직
  const onClickSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    //TODO: 닉네임 유효성 검사

    try {
      const { displayName, email, uid }: any = authService.currentUser;

      const userData: loginUserType = {
        name: displayName,
        email,
        uid,
        avatar_id: avatarId,
        nickname: inputRef.current?.value!!,
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

const NicknameWrapper = styled.div``;

const Label = styled.label`
  font-weight: 500;
  font-size: 1.2rem;
  margin-right: 8px;
`;
const Input = styled.input`
  font-size: 1.2em;
  padding: 4px 8px;
  border: 0.1px solid #aaa;
  border-radius: 4px;

  @media ${({ theme }) => theme.size.mobile} {
    width: 180px;
  }
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
