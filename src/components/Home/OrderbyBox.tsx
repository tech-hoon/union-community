import { memo, useState } from 'react';
import styled from 'styled-components';

import Calendar from 'assets/icons/Calendar';
import Fire from 'assets/icons/Fire';

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
        <CalendarIcon color={clickedOrderby === 'created_at' ? 'black' : '#868e96'} />
        <Title>최신순</Title>
      </Button>
      <Button
        onClick={onButtonClick}
        id='like_count'
        color={clickedOrderby === 'like_count' ? 'black' : '#868e96'}
      >
        <FireIcon color={clickedOrderby === 'like_count' ? 'black' : '#868e96'} />
        <Title>인기순</Title>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${(props) => props.color};
`;

const FireIcon = styled(Fire)`
  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1rem;
  }
`;
const CalendarIcon = styled(Calendar)`
  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1rem;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1rem;
  }
`;

export default memo(OrderbyBox);
