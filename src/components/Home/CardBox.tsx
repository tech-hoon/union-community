import styled from 'styled-components';
import { MOCK_CARD_LIST } from 'assets/mock_data';
import { ChatDots, SuitHeartFill, Eye } from '@styled-icons/bootstrap';

interface Props {}

const CardBox = (props: Props) => {
  return (
    <Wrapper>
      {MOCK_CARD_LIST.map(
        ({ id, title, content, creator, reply_count, view_count, like_count }) => (
          <Card>
            <Title>{title}</Title>
            <Content>{content}</Content>
            <CardBottom>
              <Creator>{creator}</Creator>
              <CountBox>
                <ChatDots size='14' />
                <Count>{reply_count}</Count>
              </CountBox>
              <CountBox>
                <Eye size='14' />
                <Count>{view_count}</Count>
              </CountBox>
              <CountBox>
                <SuitHeartFill size='14' color='red' />
                <Count>{like_count}</Count>
              </CountBox>
            </CardBottom>
          </Card>
        )
      )}
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
