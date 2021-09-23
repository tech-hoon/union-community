import React from 'react';
import styled from 'styled-components';

interface Props {}

const Footer = (props: Props) => {
  return (
    <Wrapper>
      <Title>
        &copy; Nam Taekhun {new Date().getFullYear()}
        <Github href='https://github.com/tech-hoon' target='_blank'>
          @tech-hoon
        </Github>
      </Title>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  width: 100%;
  padding: 20px 0;
`;

const Title = styled.p`
  color: #999999;
  text-align: center;
`;

const Github = styled.a`
  margin-left: 4px;
  color: #999999;
`;

export default Footer;
