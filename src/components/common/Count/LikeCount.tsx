import styled from 'styled-components';
import { memo } from 'react';
import { ThumbsUp as Like } from '@styled-icons/fa-solid';
import { ThumbsUp as LikeCancel } from '@styled-icons/fa-regular';
import { DebouncedFunc } from 'lodash';

interface Props {
  size?: string;
  count: number;
  color?: string;
  onClick?: DebouncedFunc<() => Promise<void>>;
  flag?: 'unlike' | 'like';
}

const LikeCount = ({ size = `14px`, count, color, onClick, flag }: Props) => {
  return (
    <Wrapper>
      <Button onClick={onClick}>
        {flag === 'unlike' ? (
          <Like size={size} color={color || '#18A0FB'} />
        ) : (
          <LikeCancel size={size} color={color || '#666'} />
        )}
      </Button>
      <Count size={size}>{count}</Count>
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

const Button = styled.button`
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

const Count = styled.span<ICount>`
  font-size: ${({ size }) => size};
  color: #666;
`;

export default memo(LikeCount);
