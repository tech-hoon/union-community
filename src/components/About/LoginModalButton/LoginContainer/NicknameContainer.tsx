import { useRef, useState } from 'react';
import styled from 'styled-components';
import AvatarSelect from 'components/common/Avatar/AvatarSelect';
import CustomInput from 'components/common/CustomInput';
import { verifyNickname } from 'api/user';
import { useSetRecoilState } from 'recoil';
import { registerDataState } from 'store/loginUser';
import { NICKNAME_LENGTH } from 'utils/config';
import { Layouts as S } from '../Layouts';
import useLoginStep from 'hooks/useLoginStep';
import { RegisterDataType } from 'types';
import { authService } from 'service/firebase';
import Loading from 'components/common/Loading/CircleSmall';

interface Props {}

const NicknameContainer = (prop: Props) => {
  const setRegisterData = useSetRecoilState(registerDataState);
  const [avatarId, setAvatarId] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  const { onLoginStepNext } = useLoginStep();
  const inputRef = useRef<HTMLInputElement>(null);
  const { displayName }: any = authService.currentUser;

  const onAvatarIdPrev = () => setAvatarId((prev) => (prev <= 1 ? 10 - prev : prev - 1));
  const onAvatarIdNext = () => setAvatarId((prev) => (prev >= 10 ? (prev % 10) + 1 : prev + 1));

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const __value = event.target.value;
    if (!__value) {
      setErrorInfo('* 필수 입력 항목입니다.');
      return;
    }
    if (__value.length > NICKNAME_LENGTH) {
      setErrorInfo(`* ${NICKNAME_LENGTH}자 이하로 입력해주세요.`);
      return;
    }
    setErrorInfo(null);
  };

  const onClickNext: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();

    const __value = inputRef?.current?.value;

    if (!__value || __value.length > NICKNAME_LENGTH) {
      setErrorInfo(
        !__value ? `입력값을 모두 입력해 주세요` : `${NICKNAME_LENGTH}자 이하로 입력해주세요`
      );
      return;
    }

    setIsLoading(true);

    if (!(await verifyNickname(__value))) {
      setErrorInfo('* 이미 존재하는 닉네임입니다.');
      setIsLoading(false);
      return;
    }

    try {
      const userData: RegisterDataType = {
        avatar_id: avatarId,
        nickname: __value,
      };

      setRegisterData(userData);
      setIsLoading(false);
      onLoginStepNext();
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <S.Container>
      <Title>닉네임과 아바타를 선택해주세요.</Title>
      <S.Subtitle>{displayName}님 안녕하세요!</S.Subtitle>
      <Body>
        <AvatarSelect
          avatarId={avatarId}
          onClickPrev={onAvatarIdPrev}
          onClickNext={onAvatarIdNext}
        />
        <CustomInput label='닉네임' ref={inputRef} onChange={onChange} errorInfo={errorInfo} />
      </Body>
      <S.ContainerBottom>
        {isLoading ? (
          <Loading />
        ) : (
          <S.NextButton onClick={onClickNext} disabled={!!errorInfo}>
            다음
          </S.NextButton>
        )}
      </S.ContainerBottom>
    </S.Container>
  );
};
const Title = styled(S.Title)`
  font-size: 1.8rem;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1.5rem;
  }
`;

const Body = styled(S.Body)`
  margin: 1.5rem 0;
`;

export default NicknameContainer;
