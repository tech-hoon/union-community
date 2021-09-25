import styled from 'styled-components';
import { ChatDots, SuitHeartFill, Eye } from '@styled-icons/bootstrap';

interface Props {
  size?: string;
}

const CountBox = ({ size }: Props) => {
  return (
    <CountSection>
      <Box>
        <ChatDots size={size || `14px`} />
        <Count size={size || `14px`}>4</Count>
      </Box>
      <Box>
        <Eye size={size || `14px`} />
        <Count size={size || `14px`}>120</Count>
      </Box>
      <Box>
        <SuitHeartFill size={size || `14px`} color='red' />
        <Count size={size || `14px`}>10</Count>
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

interface ICount {
  size: string;
}

const Count = styled.span<ICount>`
  font-size: ${({ size }) => size};
  padding: 0 2px;
`;

export default CountBox;
