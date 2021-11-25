import styled from 'styled-components';
import { memo } from 'react';
import { Chat } from '@styled-icons/bootstrap';
import { Heart } from '@styled-icons/entypo';
import { Eye } from '@styled-icons/fa-regular';

interface Props {
  size?: string;
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
}

const CountBox = ({ size, viewCount, likeCount, commentCount }: Props) => {
  return (
    <CountSection>
      {commentCount && (
        <Box>
          <Chat size={size || `14px`} color='#0ca5af' />
          <Count size={size || `14px`}>{commentCount}</Count>
        </Box>
      )}
      <Box>
        <Eye size={size || `14px`} color='#888' />
        <Count size={size || `14px`}>{viewCount}</Count>
      </Box>

      <Box>
        <Heart size={size || `14px`} color='#ED384F' />
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
  display: flex;
  align-items: center;
`;

interface ICount {
  size: string;
}

const Count = styled.span<ICount>`
  font-size: ${({ size }) => size};
  padding: 0 2px;
`;

export default memo(CountBox);
