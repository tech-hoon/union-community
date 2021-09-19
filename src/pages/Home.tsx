import React from 'react';
import styled from 'styled-components';

interface Props {}

const Home = (props: Props) => {
  return (
    <>
      <Title>폰트 테스트</Title>
      <Back>&#xE001; 뒤로가기</Back>
      <Subtitle>방가방가링</Subtitle>
    </>
  );
};

const Title = styled.h1`
  font-family: 'Spoqa Bold';
  font-size: 2rem;
  line-height: 126.5%;
  letter-spacing: -0.005em;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
`;

const Back = styled.p``;

export default Home;
