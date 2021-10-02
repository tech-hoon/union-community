import { useHistory } from 'react-router';
import { authService } from 'service/firebase';
import styled from 'styled-components';
import React from 'react';
import { useRecoilState } from 'recoil';
import { loginUserState } from 'store/loginUser';

interface Props {}

const MypageDropdown = (props: Props) => {
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);

  const onLogoutClick = () => {
    authService.signOut();
    setLoginUser({});
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
  padding: 4px;
  border: 0.1px solid #eee;
  width: 140px;
`;

const DropdownItem = styled.li`
  margin: 8px 4px;
`;

const MyPosts = styled(DropdownItem)``;
const MyLikes = styled(DropdownItem)``;
const Settings = styled(DropdownItem)``;
const Logout = styled(DropdownItem)``;

export default React.memo(MypageDropdown);
