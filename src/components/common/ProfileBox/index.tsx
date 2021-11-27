import styled from 'styled-components';
import Avatar from '../Avatar';
import { CaretDown, CaretUp } from '@styled-icons/boxicons-regular';
import { useState, memo } from 'react';
import MypageDropdown from './MypageDropdown';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';
import { loginUserType } from 'types';

const ProfileBox = () => {
  const loginUser = useRecoilValue(loginUserState) as loginUserType;
  const [toggleOpened, setToggleOpened] = useState(false);
  const onToggleClick = () => setToggleOpened(!toggleOpened);

  return (
    <Wrapper onClick={onToggleClick}>
      <Top>
        <Name>{loginUser.nickname}</Name>
        <Avatar avatarId={loginUser?.avatar_id!!} />
        <Icon>{toggleOpened ? <CaretUp size='20' /> : <CaretDown size='20' />}</Icon>
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

const Icon = styled.div``;

const Bottom = styled.div``;

const Name = styled.h3`
  font-weight: 700;
  font-size: 1em;

  @media ${({ theme }) => theme.size.mobileS} {
    font-size: 0.8em;
  }
`;

export default memo(ProfileBox);
