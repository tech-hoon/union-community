import React, { useState } from 'react';
import styled from 'styled-components';
import { CaretLeftFill, CaretRightFill } from '@styled-icons/bootstrap';
import Avatar from '.';
import { AVATAR_ARRAY_FEMALE, AVATAR_ARRAY_MALE } from 'utils/config';

interface Props {
  avatarId: number;
  gender: string;
  onClickPrev: () => void;
  onClickNext: () => void;
  onClickGender: React.MouseEventHandler<HTMLElement>;
  size?: string;
}

const AvatarSelect = ({
  gender,
  avatarId,
  size,
  onClickGender,
  onClickPrev,
  onClickNext,
}: Props) => {
  return (
    <Wrapper size={size || `100%`}>
      <GenderBox onClick={onClickGender}>
        <GenderButton data-id='male' isSelected={gender === 'male'}>
          ♂
        </GenderButton>
        <GenderButton data-id='female' isSelected={gender === 'female'}>
          ♀
        </GenderButton>
      </GenderBox>
      <Pagination>
        {(gender === 'male' ? AVATAR_ARRAY_MALE : AVATAR_ARRAY_FEMALE).map((v) => (
          <Dot selected={avatarId === v} key={v} />
        ))}
      </Pagination>
      <AvatarSelectWrapper>
        <PrevBtn onClick={onClickPrev} size='20px' />
        <AvatarWrapper>
          <Avatar avatarId={avatarId} size={128} />
        </AvatarWrapper>
        <NextBtn onClick={onClickNext} size='20px' />
      </AvatarSelectWrapper>
    </Wrapper>
  );
};

interface IWrapper {
  size: string;
}

const Wrapper = styled.div<IWrapper>`
  width: ${(props) => props.size};
  margin: 0 auto;
  user-select: none;
`;

const AvatarSelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const GenderBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const GenderButton = styled.button<{ isSelected: boolean }>`
  font-size: 20px;
  border-radius: 4px;
  padding: 4px 20px;
  font-weight: bold;

  &:nth-child(1) {
    border: 1px solid rgb(84, 119, 245);
    color: ${({ isSelected }) => (isSelected ? 'white' : 'rgb(84, 119, 245)')};
    background-color: ${({ isSelected }) => (isSelected ? 'rgb(84, 119, 245)' : 'transparent')};
  }

  &:nth-child(2) {
    border: 1px solid rgb(234, 118, 136);
    color: ${({ isSelected }) => (isSelected ? 'white' : 'rgb(234, 118, 136)')};
    background-color: ${({ isSelected }) => (isSelected ? 'rgb(234, 118, 136)' : 'transparent')};
  }
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
