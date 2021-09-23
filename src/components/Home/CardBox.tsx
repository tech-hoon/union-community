import styled from 'styled-components';
import { ChatDots, SuitHeartFill, Eye } from '@styled-icons/bootstrap';
import { CardType } from 'types';

interface Props {
  cards: CardType[];
}

const CardBox = ({ cards }: Props) => {
  return (
    <Wrapper>
      {cards.map(({ id, name, body }) => (
        <Card key={id}>
          <Title>{name}</Title>
          <Content>{body}</Content>
          <CardBottom>
            <Creator>홍길동</Creator>
            <CountBox>
              <ChatDots size='14' />
              <Count>4</Count>
            </CountBox>
            <CountBox>
              <Eye size='14' />
              <Count>120</Count>
            </CountBox>
            <CountBox>
              <SuitHeartFill size='14' color='red' />
              <Count>10</Count>
            </CountBox>
          </CardBottom>
        </Card>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin: 0 auto;

  @media ${({ theme }) => theme.size.mobile} {
    grid-template-columns: 1fr 1fr;
  }
`;
const Card = styled.div`
  width: 100%;
  padding: 24px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    transform: scale(105%);
  }
`;
const Title = styled.h2`
  font-family: 'Spoqa Bold';
  font-size: 20px;
  margin-bottom: 24px;
`;
const Content = styled.p`
  margin-bottom: 24px;
`;

const CardBottom = styled.div`
  display: flex;
  align-items: center;
`;

const Creator = styled.span`
  font-family: 'Spoqa Medium';
  color: ${({ theme }) => theme.color.BLUE};
  flex: 1;
  font-size: 16px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 14px;
  }
`;

const CountBox = styled.span`
  display: flex;
  align-items: center;
  padding: 0 2px;
`;
const Count = styled.span`
  font-size: 14px;
  padding: 0 2px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 12px;
  }
`;

export default CardBox;
