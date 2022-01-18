import styled from 'styled-components';
import { memo } from 'react';
import Comment from 'assets/icons/Comment';

interface Props {
  size?: string;
  count: number;
}

const CommentCount = ({ size, count }: Props) => {
  return (
    <Wrapper>
      <Comment width='17' height='14' />
      <Count size={size || `14px`}>{count}</Count>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 4px;
  display: flex;
  align-items: center;
  gap: 3px;
`;

interface ICount {
  size: string;
}

const Count = styled.span<ICount>`
  font-size: ${({ size }) => size};
  color: #5c5c5c;
`;

export default memo(CommentCount);
