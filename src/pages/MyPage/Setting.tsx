import styled from 'styled-components';
import { useState } from 'react';
import { Layouts as S } from 'components/Mypage/Layouts';
import { SettingsOutline } from '@styled-icons/evaicons-outline';
import { useRecoilState } from 'recoil';
import { loginUserState } from 'store/loginUser';
import AvatarSelect from 'components/common/Portals/LoginPortal/components/AvatarSelect';

const Setting = () => {
  const [user, setUser] = useRecoilState(loginUserState);
  const [avatarId, setAvatarId] = useState<number>(1);
  const onAvatarIdPrev = () => setAvatarId((prev) => (prev <= 1 ? 10 - prev : prev - 1));
  const onAvatarIdNext = () => setAvatarId((prev) => (prev >= 10 ? (prev % 10) + 1 : prev + 1));

  return (
    <S.Wrapper>
      <S.Navbar isLoggedIn={true} />
      <S.Container>
        <S.Title>
          <SettingsOutline size='30px' />
          나의 정보 수정
        </S.Title>
        <S.Body>
          <AvatarSelect
            onClickNext={onAvatarIdNext}
            onClickPrev={onAvatarIdPrev}
            avatarId={avatarId}
            size={`60%`}
          />
          <NicknameWrapper>
            <Label>닉네임</Label>
            <NicknameInput defaultValue={user.nickname} />
          </NicknameWrapper>
          <ButtonWrapper>
            <SubmitButton>완료</SubmitButton>
            <DeleteButton>회원 탈퇴</DeleteButton>
          </ButtonWrapper>
        </S.Body>
      </S.Container>
    </S.Wrapper>
  );
};

const NicknameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  line-height: 1;
  margin-top: 32px;
`;
const Label = styled.label`
  font-weight: bold;
  font-size: 1.5rem;
  flex: 1;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1.3em;
  }

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1em;
  }
`;
const NicknameInput = styled.input`
  font-size: 1.5rem;
  border: 1px solid #ccc;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1.3em;
  }

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1em;
  }
`;
const ButtonWrapper = styled.div`
  margin-top: 80px;
`;

const SubmitButton = styled(S.Button)`
  background-color: black;
  margin-right: 8px;
`;
const DeleteButton = styled(S.Button)`
  background-color: #ff3213;
`;

export default Setting;
