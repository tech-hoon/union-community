import styled from 'styled-components';
import Avatar from '../Avatar';
import { CaretDown, CaretUp } from '@styled-icons/boxicons-regular';
import { useState, memo, useEffect, useRef } from 'react';
import MypageDropdown from './MypageDropdown';
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'store/loginUser';
import { LoginUserType } from 'types';

const ProfileBox = () => {
  const loginUser = useRecoilValue(loginUserState) as LoginUserType;
  const [toggleOpened, setToggleOpened] = useState(false);
  const onToggleClick = () => setToggleOpened(!toggleOpened);

  useEffect(() => {
    if (toggleOpened) {
      window.addEventListener('click', onToggleClick);
    }
    return () => window.removeEventListener('click', onToggleClick);
  }, [toggleOpened]);

  return (
    <Wrapper onClick={onToggleClick}>
      <Name>{loginUser.nickname}</Name>
      <Avatar avatarId={loginUser?.avatar_id!!} size={32} />
      <IconWrapper>
        {toggleOpened ? <CaretUp size='20' /> : <CaretDown size='20' />}
        <Bottom>{toggleOpened && <MypageDropdown />}</Bottom>
      </IconWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 6px;
`;

const IconWrapper = styled.div`
  position: relative;
`;

const Name = styled.h3`
  font-weight: 700;
  font-size: 1.1em;

  @media ${({ theme }) => theme.size.mobile} {
    display: none;
  }
`;

const Bottom = styled.div`
  top: 30px;
  right: 120px;
  position: absolute;

  @media ${({ theme }) => theme.size.mobile} {
    right: 100px;
  }
`;

export default memo(ProfileBox);
