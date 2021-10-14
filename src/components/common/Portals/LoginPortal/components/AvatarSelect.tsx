import React, { useState } from 'react';
import styled from 'styled-components';
import { CaretLeftFill, CaretRightFill } from '@styled-icons/bootstrap';
import CurrentAvatar from 'components/common/Avatar/CurrentAvatar';

interface Props {
  avatarId: number;
  onClickPrev: () => void;
  onClickNext: () => void;
}

const AvatarSelect = ({ avatarId, onClickPrev, onClickNext }: Props) => {
  return (
    <Wrapper>
      <Pagination>
        {new Array(MAX).fill('').map((_, currentId) => (
          <Dot selected={avatarId - 1 === currentId} key={currentId} />
        ))}
      </Pagination>
      <Box>
        <PrevBtn onClick={onClickPrev} />
        <AvatarWrapper>
          <CurrentAvatar avatarId={avatarId} />
        </AvatarWrapper>

        <NextBtn onClick={onClickNext} />
      </Box>
    </Wrapper>
  );
};

const MAX = 10;

const Wrapper = styled.div`
  width: 100%;
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AvatarWrapper = styled.div`
  width: 30%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
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
`;
const NextBtn = styled(CaretRightFill)`
  width: 24px;
`;

export default React.memo(AvatarSelect);
