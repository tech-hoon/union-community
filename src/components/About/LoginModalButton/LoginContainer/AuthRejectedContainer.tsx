import { memo, useState } from 'react';
import { authService, storageService } from 'service/firebase';
import styled from 'styled-components';
import { LoginUserType } from 'types';
import { Layouts as S } from '../Layouts';
import { Warning } from '@styled-icons/fluentui-system-filled';
import { deleteUserData } from 'api/user';

interface Props {
  loginUser: LoginUserType | null;
  onLoginStepReset: () => void;
}

const AuthRejectedContainer = ({ loginUser, onLoginStepReset }: Props) => {
  const onClickReset = async () => {
    if (loginUser) {
      loginUser.resident_auth_image &&
        (await storageService.refFromURL(loginUser.resident_auth_image).delete());
      await deleteUserData(loginUser.uid);
      authService.signOut();
      onLoginStepReset();
    }
  };

  return (
    <S.Container>
      <S.Title>가입 승인이 거절되었습니다.</S.Title>
      <S.Body>
        <WarningWrapper>
          <Warning size='60px' />
        </WarningWrapper>
        <Description>
          {loginUser?.name && (
            <p>
              <small>{loginUser.name}</small>님, 가입 승인이 거절되었습니다.
            </p>
          )}
          <p>다시 시작하려면 하단 버튼을 눌러주세요.</p>
          <p>
            문의사항은{' '}
            <a href='https://open.kakao.com/o/s3IX0aNd' target='_blank' rel='noreferrer'>
              여기
            </a>
            로 연락주세요.
          </p>
        </Description>
      </S.Body>
      <S.ContainerBottom>
        <ResetButton onClick={onClickReset}>다시하기</ResetButton>
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
    color: ${(props) => props.theme.color.MAIN};
  }
`;

const WarningWrapper = styled.div`
  margin-bottom: 36px;
`;

const ResetButton = styled(S.NextButton)``;

export default memo(AuthRejectedContainer);
