import styled from 'styled-components';
import { Fire } from '@styled-icons/icomoon';
import { CalendarCheck } from '@styled-icons/bootstrap';

interface Props {}

const OrderBox = (props: Props) => {
  return (
    <Wrapper>
      <Box>
        <FireIcon size={20} />
        <Title>인기순</Title>
      </Box>
      <Box>
        <CalendarIcon size={20} />
        <Title>최신순</Title>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 15% 20px;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    transform: scale(105%);
  }

  cursor: pointer;
`;

const FireIcon = styled(Fire)``;
const CalendarIcon = styled(CalendarCheck)``;

const Title = styled.div`
  font-family: 'Spoqa Bold';
  font-size: 20px;
`;

export default OrderBox;
