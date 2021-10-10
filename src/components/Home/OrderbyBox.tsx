import { useState } from 'react';
import styled from 'styled-components';
import { Fire } from '@styled-icons/icomoon';
import { CalendarCheck } from '@styled-icons/bootstrap';
import { useRecoilState } from 'recoil';
import { postsOrderByState } from 'store/post';

const OrderbyBox = () => {
  const [orderby, setOrderby] = useRecoilState(postsOrderByState);
  const [clickedOrderby, setClickedOrderby] = useState<string>(orderby);

  const onButtonClick: React.MouseEventHandler = (event) => {
    setOrderby(event.currentTarget.id);
    setClickedOrderby(event.currentTarget.id);
  };

  return (
    <Wrapper>
      <Button
        onClick={onButtonClick}
        id='created_at'
        color={clickedOrderby === 'created_at' ? 'black' : '#868e96'}
      >
        <CalendarIcon size={20} />
        <Title>최신순</Title>
      </Button>
      <Button
        onClick={onButtonClick}
        id='like_count'
        color={clickedOrderby === 'like_count' ? 'black' : '#868e96'}
      >
        <FireIcon size={20} />
        <Title>인기순</Title>
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
const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${(props) => props.color};

  &:hover {
    transform: scale(105%);
    transition: 0.3s;
  }
`;

const FireIcon = styled(Fire)``;
const CalendarIcon = styled(CalendarCheck)``;

const Title = styled.div`
  font-family: 'Spoqa Bold';
  font-size: 20px;
`;

export default OrderbyBox;
