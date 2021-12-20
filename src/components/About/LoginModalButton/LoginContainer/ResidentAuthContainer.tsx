import styled from 'styled-components';
import exampleImgSrc from 'assets/images/resident1.jpeg';
import { useState, useEffect } from 'react';
import { authService, storageService } from 'service/firebase';
import { Layouts as S } from '../Layouts';
import { PlusLg } from '@styled-icons/bootstrap';
import useLoginStep from 'hooks/useLoginStep';
import { addUser } from 'api/user';
import { loginUserState, registerDataState } from 'store/loginUser';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LoginUserType, RegisterDataType } from 'types';
import { Cancel } from '@styled-icons/material';
import Loading from 'components/common/Loading/CircleSmall';
import { OPEN_KAKAOTALK_URL } from 'utils/config';

const ResidentAuthContainer = () => {
  const { displayName, uid }: any = authService.currentUser;
  const [attachment, setAttachment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { onLoginStepNext } = useLoginStep();
  const loginUser = useRecoilValue(loginUserState) as LoginUserType;
  const setLoginUser = useSetRecoilState(loginUserState);
  const registerData = useRecoilValue(registerDataState) as RegisterDataType;

  const onSubmitFile: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    setIsLoading(true);

    const attachmentRef = storageService.ref().child(`${uid}/resident_auth_image`);
    const response = await attachmentRef.putString(attachment, 'data_url');
    const attachmentUrl = await response.ref.getDownloadURL();

    try {
      const { displayName, email, uid }: any = authService.currentUser;
      const userData: LoginUserType = {
        uid,
        name: displayName,
        email,
        resident_auth_image: attachmentUrl,
        like_list: [],
        post_list: [],
        created_at: new Date().getTime(),
        auth_status: 'waiting',
        notification_list: [],
        sent_message_list: [],
        received_message_list: [],
        ...registerData,
      };

      addUser(userData);
      setLoginUser({ ...loginUser, ...userData });
      onLoginStepNext();
    } catch (error) {
      console.log('error', error);
    }
  };

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent: any) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    if (!!file) {
      reader.readAsDataURL(file);
    }
  };

  const onDeleteAttachment: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setAttachment('');
  };

  useEffect(() => {
    attachment && setAttachment(attachment);
  }, [attachment]);

  return (
    <S.Container>
      <S.Title>생활관 거주 인증을 해주세요</S.Title>
      <Desception>
        <li>거주생 인증을 위해 간단한 인증 절차를 거치고 있습니다.</li>
        <li>
          예시 사진과 같이 사용자의 성함<small>{displayName || ''}</small>이 적힌 이름표 사진을
          업로드해주세요.
        </li>
        <li>
          관리자 승인 후 즉시 이용 가능하며, 기타 문의사항은{' '}
          <a href={OPEN_KAKAOTALK_URL} target='_blank' rel='noreferrer'>
            여기
          </a>
          로 연락주세요.
        </li>
      </Desception>

      <S.Body>
        <ImageBox>
          <ImageWrapper>
            <Caption>예시 사진</Caption>
            <ExampleImage src={exampleImgSrc} />
          </ImageWrapper>
          <ImageWrapper>
            <Caption>업로드 사진</Caption>
            {attachment ? (
              <AttachmentWrapper>
                <ThumbnailDeleteBtn onClick={onDeleteAttachment}>
                  <Cancel size='20px' />
                </ThumbnailDeleteBtn>
                <AttachmentImage src={attachment} />
              </AttachmentWrapper>
            ) : (
              <UploadImage htmlFor='upload-image'>
                <PlusLg size='48px' color='#ddd' />
              </UploadImage>
            )}
            <UploadInput id='upload-image' type='file' accept='image/*' onChange={onFileChange} />
          </ImageWrapper>
        </ImageBox>
      </S.Body>
      <S.ContainerBottom>
        {isLoading ? (
          <Loading />
        ) : (
          <SubmitButton onClick={onSubmitFile} disabled={!attachment}>
            업로드
          </SubmitButton>
        )}
      </S.ContainerBottom>
    </S.Container>
  );
};

const Desception = styled.div`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4;
  text-align: left;
  color: #888;
  padding: 0 10px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.8rem;
    line-height: 1.7;
  }

  li {
    list-style: circle;
  }

  small {
    font-weight: 500;
    color: ${({ theme }) => theme.color.MAIN};
    margin: 0 3px;
  }

  b {
    font-weight: 500;
    color: #444;
  }
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 6px;
`;

const Img = styled.img`
  border-radius: 8px;
  width: 180px;
  height: 180px;

  @media ${({ theme }) => theme.size.mobile} {
    width: 150px;
    height: 150px;
  }
`;

const ExampleImage = styled(Img)``;
const AttachmentImage = styled(Img)``;

const ImageWrapper = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AttachmentWrapper = styled.div`
  position: relative;
`;

const ThumbnailDeleteBtn = styled.button`
  display: block;
  font-size: 0.8rem;
  position: absolute;
  top: -14px;
  right: -20px;
  color: red;
`;

const UploadImage = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #aaa;
  cursor: pointer;

  border-radius: 8px;
  width: 180px;
  height: 180px;

  @media ${({ theme }) => theme.size.mobile} {
    width: 150px;
    height: 150px;
  }
`;

const UploadInput = styled.input`
  display: none;
`;

const Caption = styled.figcaption`
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 6px;
  color: #222;
`;

const SubmitButton = styled(S.NextButton)`
  &:disabled {
    cursor: default;
    background-color: #ccc;
  }
`;

export default ResidentAuthContainer;
