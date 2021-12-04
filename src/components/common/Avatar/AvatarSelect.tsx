import React, { useState } from 'react';
import styled from 'styled-components';
import { CaretLeftFill, CaretRightFill } from '@styled-icons/bootstrap';
import Avatar from 'components/common/Avatar';

interface Props {
  avatarId: number;
  onClickPrev: () => void;
  onClickNext: () => void;
  size?: string;
}

const AvatarSelect = ({ avatarId, onClickPrev, onClickNext, size }: Props) => {
  return (
    <Wrapper size={size || `100%`}>
      <Pagination>
        {new Array(MAX).fill('').map((_, currentId) => (
          <Dot selected={avatarId - 1 === currentId} key={currentId} />
        ))}
      </Pagination>
      <Box>
        <PrevBtn onClick={onClickPrev} size='20px' />
        <AvatarWrapper>
          <Avatar avatarId={avatarId} size={128} />
        </AvatarWrapper>
        <NextBtn onClick={onClickNext} size='20px' />
      </Box>
    </Wrapper>
  );
};

const MAX = 10;

interface IWrapper {
  size: string;
}

const Wrapper = styled.div<IWrapper>`
  width: ${(props) => props.size};
  margin: 0 auto;
  user-select: none;
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 28px 0;
`;

const Pagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

interface IDot {
  selected: boolean;
}

const Dot = styled.div<IDot>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ selected }) => (selected ? '#18A0FB' : 'rgba(	24, 160, 251,0.3)')};
`;

const PrevBtn = styled(CaretLeftFill)`
  width: 24px;
  cursor: pointer;
`;
const NextBtn = styled(CaretRightFill)`
  width: 24px;
  cursor: pointer;
`;

export default React.memo(AvatarSelect);
