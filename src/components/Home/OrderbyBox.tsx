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
  gap: 12px;
  user-select: none;
  margin: 10px 0 4px;

  @media ${({ theme }) => theme.size.mobile} {
    gap: 4px;
  }
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

const FireIcon = styled(Fire)`
  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1.2rem;
  }
`;
const CalendarIcon = styled(CalendarCheck)`
  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1.2rem;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1.2rem;
  }
`;

export default OrderbyBox;
