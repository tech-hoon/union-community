import styled from 'styled-components';
import Avatar from './Avatar';
import { CaretDown } from '@styled-icons/boxicons-regular';
import React, { useState } from 'react';
import MypageDropdown from './MypageDropdown';

const ProfileBox = () => {
  const [toggleOpened, setToggleOpened] = useState(false);
  const onToggleClick = () => setToggleOpened(!toggleOpened);

  return (
    <Wrapper>
      <Top>
        <Name>후니</Name>
        <Avatar />
        <CaretDown size='20' onClick={onToggleClick} />
      </Top>
      <Bottom>{toggleOpened && <MypageDropdown />}</Bottom>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  cursor: pointer;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Bottom = styled.div``;

const Name = styled.h3`
  font-family: 'Spoqa Bold';
  font-size: 1em;
`;

export default React.memo(ProfileBox);
