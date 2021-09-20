import styled from 'styled-components';
import { Fire } from '@styled-icons/icomoon';
import { CalendarCheck } from '@styled-icons/bootstrap';

interface Props {}

const OrderBox = (props: Props) => {
  return (
    <Wrapper>
      <Box>
        <Fire size='24' />
        <Title>인기순</Title>
      </Box>
      <Box>
        <CalendarCheck size='24' />
        <Title>최신순</Title>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 4% 2.5%;
`;
const Box = styled.div`
  display: flex;
  gap: 4px;
`;
const Title = styled.div`
  font-family: 'Spoqa Bold';
  font-size: 24px;
`;

export default OrderBox;
