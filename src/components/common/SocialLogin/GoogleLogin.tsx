import React from 'react';
import styled from 'styled-components';
import { auth, signInWithGoogle } from 'service/firebase';

interface Props {}

const GoogleLogin = (props: Props) => {
  auth.onAuthStateChanged((user: any) => {
    if (user !== null) {
      console.log(user);
      console.log('로그인 되었습니다');
    }
  });

  return (
    <Wrapper>
      <GoogleLogo onClick={signInWithGoogle}>Google</GoogleLogo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
`;

const GoogleLogo = styled.button`
  width: 50px;
`;

export default GoogleLogin;
