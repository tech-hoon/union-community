// import { useHistory } from 'react-router';
import styled from 'styled-components';

interface Props {}

const NicknameContainer = (prop: Props) => {
  //TODO: 로그인 처리 로직

  return (
    <Wrapper>
      <Title>
        감사합니다 !<br />
        사용하실 닉네임을 설정해주세요 !
      </Title>
      <Body>
        <Label>닉네임</Label>
        <Input />
      </Body>
      <Button onClick={() => {}}>다음</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 24px;
`;

const Title = styled.h1`
  font-family: 'Spoqa Bold';
  font-size: 2em;
  line-height: 150%;
`;

const Body = styled.div`
  margin: 10% 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Label = styled.label`
  font-family: 'Spoqa Medium';
  font-size: 1.5em;
`;
const Input = styled.input`
  font-size: 1.5em;
  width: 300px;
  padding: 10px;
  border: 0.3px solid gray;
`;

const Button = styled.button`
  width: 30%;
  border: 1px solid black;
  padding: 4px;
  margin: 0 auto;
`;

export default NicknameContainer;
