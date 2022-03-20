import { memo, useState } from 'react';
import { authService } from 'service/firebase';
import styled from 'styled-components';
import { LoginUserType } from 'types';
import { Layouts as S } from '../Layouts';
import { ClockHistory } from '@styled-icons/bootstrap';
import { OPEN_KAKAOTALK_URL } from 'utils/config';

interface Props {
  loginUser: LoginUserType | null;
  onLoginStepReset: () => void;
}

const AuthWaitingContainer = ({ loginUser, onLoginStepReset }: Props) => {
  const name = loginUser?.name;

  const onClickLogOut = () => {
    authService.signOut();
    onLoginStepReset();
  };

  const onClickRefresh = () => {
    window.location.reload();
  };

  return (
    <S.Container>
      <S.Title>가입 승인 대기중입니다.</S.Title>
      <S.Body>
        <LogoWrapper>
          <ClockHistory size='64px' />
        </LogoWrapper>
        <Description>
          <li>현재 가입 승인 대기중입니다.</li>
          <li>관리자의 승인을 기다리고 있습니다.</li>
          <li>최대 30분 정도 소요될 수 있습니다.</li>
          <li>
            문의사항은{' '}
            <a href={OPEN_KAKAOTALK_URL} target='_blank' rel='noreferrer'>
              여기
            </a>
            로 주세요.
          </li>
        </Description>
      </S.Body>
      <S.ContainerBottom>
        <LogOutButton onClick={onClickLogOut}>로그아웃</LogOutButton>
        <RefreshButton onClick={onClickRefresh}>새로고침</RefreshButton>
      </S.ContainerBottom>
    </S.Container>
  );
};

const Description = styled.section`
  & li {
    font-size: 1.1rem;
    font-weight: 400;
    color: #666;
    margin: 12px 0;
    list-style-type: disc;
    text-align: left;

    & a {
      color: ${(props) => props.theme.color.main};
    }
  }

  & small {
    color: ${(props) => props.theme.color.main};
  }
`;

const LogoWrapper = styled.div`
  margin-bottom: 50px;
`;

const LogOutButton = styled(S.NextButton)`
  background-color: white;
  color: ${(props) => props.theme.color.main};
  font-weight: 400;
`;

const RefreshButton = styled(S.NextButton)``;

export default memo(AuthWaitingContainer);
