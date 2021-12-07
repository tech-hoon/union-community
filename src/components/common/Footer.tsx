import React from 'react';
import styled from 'styled-components';
import { Github } from '@styled-icons/icomoon';
import { Email } from '@styled-icons/material-outlined';

interface Props {}

const Footer = (props: Props) => {
  return (
    <Wrapper>
      <Title>&copy; Nam Taekhun {new Date().getFullYear()}</Title>
      <OpenKakao href='https://open.kakao.com/o/s3IX0aNd' target='_blank' rel='noreferrer'>
        문의사항
      </OpenKakao>
      <GithubIcon href='https://github.com/tech-hoon' target='_blank' rel='noreferrer'>
        <Github size='14px' />
      </GithubIcon>
      <EmailIcon href='mailto:nth9708@naver.com' target='_blank' rel='noreferrer'>
        <Email size='16px' />
      </EmailIcon>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  width: 100%;
  padding: 60px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  position: absolute;
`;

const OpenKakao = styled.a`
  color: #999999;
  text-decoration: none;
`;

const Title = styled.p`
  color: #999999;
  text-align: center;
  line-height: 1;
`;

const GithubIcon = styled.a`
  color: #999999;
  margin-bottom: 3px;
`;

const EmailIcon = styled.a`
  color: #999999;
  margin-bottom: 2px;
`;

export default Footer;
