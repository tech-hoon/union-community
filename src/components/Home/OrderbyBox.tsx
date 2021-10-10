import styled from 'styled-components';
import { Fire } from '@styled-icons/icomoon';
import { CalendarCheck } from '@styled-icons/bootstrap';
import { useSetRecoilState } from 'recoil';
import { postsOrderByState } from 'store/post';

interface IButton {}

const OrderbyBox = () => {
  const setOrderBy = useSetRecoilState(postsOrderByState);

  const onButtonClick = (event: any) => setOrderBy(event.currentTarget.value);

  return (
    <Wrapper>
      <Button onClick={onButtonClick} value='like_count'>
        <FireIcon size={20} />
        <Title>인기순</Title>
      </Button>
      <Button onClick={onButtonClick} value='created_at'>
        <CalendarIcon size={20} />
        <Title>최신순</Title>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 15% 20px;
`;
const Button = styled.button<IButton>`
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    transform: scale(105%);
  }
`;

const FireIcon = styled(Fire)``;
const CalendarIcon = styled(CalendarCheck)``;

const Title = styled.div`
  font-family: 'Spoqa Bold';
  font-size: 20px;
`;

export default OrderbyBox;
