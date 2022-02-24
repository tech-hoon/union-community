import { memo, useState } from 'react';
import { authService } from 'service/firebase';
import styled from 'styled-components';
import { LoginUserType } from 'types';
import { Layouts as S } from '../Layouts';
// import Circle from 'components/common/Loading/Circle';
import { ClockHistory } from '@styled-icons/bootstrap';

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

  return (
    <S.Container>
      <S.Title>가입 승인 대기중입니다.</S.Title>
      <S.Body>
        <LogoWrapper>
          <ClockHistory size='64px' />
        </LogoWrapper>
        <Description>
          <p>{name && <small>{name}님, </small>}현재 가입 승인 대기중입니다.</p>
          <p>관리자의 승인을 기다리고 있습니다.</p>
          <p>가입이 승인되는 대로 이용 가능합니다.</p>
        </Description>
      </S.Body>
      <S.ContainerBottom>
        <LogOutButton onClick={onClickLogOut}>로그아웃</LogOutButton>
      </S.ContainerBottom>
    </S.Container>
  );
};

const Description = styled.section`
  & p {
    font-size: 1.1rem;
    font-weight: 400;
    color: #666;
    margin: 12px 0;
  }

  & small {
    color: ${(props) => props.theme.color.main};
  }
`;

const LogoWrapper = styled.div`
  margin-bottom: 50px;
`;

const LogOutButton = styled(S.NextButton)``;

export default memo(AuthWaitingContainer);
