import React from 'react';
import styled from 'styled-components';
import Navbar from 'components/common/Navbar';

interface Props {}

const Notification = (props: Props) => {
  return (
    <Wrapper>
      <Navbar />
      <Container>
        <Title>알림</Title>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.div``;

const Title = styled.h1``;
export default Notification;
