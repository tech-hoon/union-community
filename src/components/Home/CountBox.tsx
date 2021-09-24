import styled from 'styled-components';
import { ChatDots, SuitHeartFill, Eye } from '@styled-icons/bootstrap';

interface Props {}

const CountBox = (props: Props) => {
  return (
    <CountSection>
      <Box>
        <ChatDots size='14' />
        <Count>4</Count>
      </Box>
      <Box>
        <Eye size='14' />
        <Count>120</Count>
      </Box>
      <Box>
        <SuitHeartFill size='14' color='red' />
        <Count>10</Count>
      </Box>
    </CountSection>
  );
};

const CountSection = styled.section`
  display: flex;
  align-items: center;
`;

const Box = styled.div`
  padding: 0 2px;
`;

const Count = styled.span`
  font-size: 14px;
  padding: 0 2px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 12px;
  }
`;

export default CountBox;
