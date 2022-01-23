import styled from 'styled-components';

const Description = () => {
  return (
    <>
      <TextMobile>
        <b>대학생 연합기숙사 입주생</b>을 위한
        <br /> 커뮤니티 <em>유니온</em>입니다. <br />
        가입하고 <b>일상, 스터디</b> 등<br /> 다양한 정보를 나누어 보세요.
      </TextMobile>
      <TextPC>
        <b>대학생 연합기숙사 입주생</b>을 위한 커뮤니티 <em>유니온</em>입니다. <br />
        가입하고 <b>일상, 스터디</b> 등 다양한 정보를 나누어 보세요.
      </TextPC>
    </>
  );
};

const Text = styled.h1`
  font-weight: 300;
  letter-spacing: -0.05em;
  width: 100%;
  padding: 16px;

  & b {
    font-weight: 400;
  }

  & em {
    font-weight: bold;
    color: ${({ theme }) => theme.color.MAIN};
  }
`;

const TextMobile = styled(Text)`
  display: none;

  @media ${({ theme }) => theme.size.mobile} {
    display: inline;
    letter-spacing: 0.03em;
    font-size: 22px;
    line-height: 35px;
    margin: 0 30px 10%;
  }
`;

const TextPC = styled(Text)`
  font-size: 26px;
  line-height: 1.8;
  margin-bottom: 5%;

  @media ${({ theme }) => theme.size.mobile} {
    display: none;
  }
`;

export default Description;
