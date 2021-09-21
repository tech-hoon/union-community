import Navbar from 'components/common/Navbar';
import styled from 'styled-components';

interface Props {}

const About = (props: Props) => {
  return (
    <Wrapper>
      <Navbar page='About' />
      <Content>
        대학생 연합기숙사 입주생들을 위한 커뮤니티입니다.
        <br />
        가입하고 동아리, 스터디 등 다양한 정보를 나누어 보아요!
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Content = styled.p``;

export default About;
