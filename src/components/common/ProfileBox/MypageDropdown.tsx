import { authService } from 'service/firebase';
import styled from 'styled-components';
import React, { memo } from 'react';
import { useResetRecoilState } from 'recoil';
import { loginUserState } from 'store/loginUser';
import useLoginStep from 'hooks/useLoginStep';
import { useHistory } from 'react-router';

const MypageDropdown = () => {
  const history = useHistory();
  const resetLoginUser = useResetRecoilState(loginUserState);
  const { onLoginStepReset } = useLoginStep();

  const onLogout = () => {
    resetLoginUser();
    onLoginStepReset();
    authService.signOut();
  };

  const onButtonClick: React.MouseEventHandler<HTMLUListElement> = (event) => {
    const id = (event.target as Element).id;
    if (id !== 'logout') {
      history.push(`/${id}`);
      return;
    }

    onLogout();
  };

  return (
    <Wrapper onClick={onButtonClick}>
      <MyPosts id='myposts'>내 작성글</MyPosts>
      <MyLikes id='likes'>내 관심글</MyLikes>
      <Settings id='setting'>설정</Settings>
      <Logout id='logout'>로그아웃</Logout>
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  position: absolute;
  z-index: 2000;
  background-color: #f8f9fa;
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
  padding: 12px;
`;

const MyPosts = styled(DropdownItem)``;
const MyLikes = styled(DropdownItem)``;
const Settings = styled(DropdownItem)``;
const Logout = styled(DropdownItem)``;

export default memo(MypageDropdown);
