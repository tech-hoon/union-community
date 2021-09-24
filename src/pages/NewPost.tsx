import Navbar from 'components/common/Navbar';
import React from 'react';
import styled from 'styled-components';

interface Props {}

const NewPost = (props: Props) => {
  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default NewPost;
