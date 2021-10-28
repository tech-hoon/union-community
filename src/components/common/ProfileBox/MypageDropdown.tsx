import { authService } from 'service/firebase';
import styled from 'styled-components';
import { memo } from 'react';
import { useResetRecoilState } from 'recoil';
import { loginUserState } from 'store/loginUser';
import useLoginStep from 'hooks/useLoginStep';

const MypageDropdown = () => {
  const resetLoginUser = useResetRecoilState(loginUserState);
  const { onLoginStepReset } = useLoginStep();

  const onLogoutClick = () => {
    resetLoginUser();
    onLoginStepReset();
    authService.signOut();
  };

  return (
    <Wrapper>
      <MyPosts>내 작성글</MyPosts>
      <MyLikes>내 관심글</MyLikes>
      <Settings>설정</Settings>
      <Logout onClick={onLogoutClick}>로그아웃</Logout>
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  position: absolute;
  z-index: 2000;
  background-color: #f8f9fa;
  padding: 8px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 140px;
  user-select: none;

  @media ${({ theme }) => theme.size.mobile} {
    width: 100px;
    font-size: 0.8em;
  }
`;

const DropdownItem = styled.li`
  margin: 12px 4px;
`;

const MyPosts = styled(DropdownItem)``;
const MyLikes = styled(DropdownItem)``;
const Settings = styled(DropdownItem)``;
const Logout = styled(DropdownItem)``;

export default memo(MypageDropdown);
