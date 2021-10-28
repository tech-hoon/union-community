import styled from 'styled-components';
import { memo } from 'react';
import { Chat, Eye } from '@styled-icons/bootstrap';
import { Like } from '@styled-icons/boxicons-regular';

interface Props {
  size?: string;
  viewCount: number;
  likeCount: number;
  commentCount?: number;
}

const CountBox = ({ size, viewCount, likeCount, commentCount }: Props) => {
  return (
    <CountSection>
      <Box>
        <Chat size={size || `14px`} color='#0ca5af' />
        <Count size={size || `14px`}>{commentCount}</Count>
      </Box>
      <Box>
        <Eye size={size || `14px`} />
        <Count size={size || `14px`}>{viewCount}</Count>
      </Box>
      <Box>
        <Like size={size || `14px`} color='#c62917' />
        <Count size={size || `14px`}>{likeCount}</Count>
      </Box>
    </CountSection>
  );
};

const CountSection = styled.section`
  display: flex;
  align-items: center;
`;

const Box = styled.div`
  padding: 0 3px;
`;

interface ICount {
  size: string;
}

const Count = styled.span<ICount>`
  font-size: ${({ size }) => size};
  padding: 0 2px;
`;

export default memo(CountBox);
