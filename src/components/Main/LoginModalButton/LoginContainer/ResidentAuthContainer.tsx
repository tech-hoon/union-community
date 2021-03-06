import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { authService, storageService } from 'service/firebase';
import { Layouts as S } from '../Layouts';
import { PlusLg } from '@styled-icons/bootstrap';
import imageCompression from 'browser-image-compression';
import useLoginStep from 'hooks/useLoginStep';
import { addUser } from 'api/user';
import { loginUserState, registerDataState } from 'store/loginUser';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LoginUserType, RegisterDataType } from 'types';
import { Cancel } from '@styled-icons/material';
import Loading from 'components/common/Loading/CircleSmall';
import { OPEN_KAKAOTALK_URL } from 'utils/config';
import NameTagSample from 'assets/images/NameTagSample';

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

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files as FileList;
    const newImage = await imageCompression.getDataUrlFromFile(
      await imageCompression(files[0], { maxSizeMB: 1 })
    );
    setAttachment(newImage);
  };

  const onDeleteAttachment: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setAttachment('');
  };

  return (
    <S.Container>
      <Title>????????? ?????? ????????? ????????????</Title>
      <Description>
        <li>
          <b>????????? ??????</b>??? ?????? ????????? <b>?????? ??????</b>??? ????????? ????????????.
        </li>
        <li>
          ?????? ????????? ?????? ??? ?????? <b>????????? ??????</b>??? ???????????? ?????????.
        </li>
        <li>
          <b>????????? ?????? ???</b> ?????? ????????????, ???????????????{' '}
          <a href={OPEN_KAKAOTALK_URL} target='_blank' rel='noreferrer'>
            ??????
          </a>
          ??? ?????????.
        </li>
        <li>
          ?????? ????????? <b>????????? ?????? ?????????</b>????????? ???????????????.
        </li>
      </Description>

      <S.Body>
        <ImageBox>
          <ImageWrapper>
            <Caption>?????? ??????</Caption>
            <ExampleImage>
              <NameTagSample />
            </ExampleImage>
          </ImageWrapper>
          <ImageWrapper>
            <Caption>????????? ??????</Caption>
            {attachment ? (
              <AttachmentWrapper>
                <ThumbnailDeleteBtn onClick={onDeleteAttachment}>
                  <Cancel size='20px' />
                </ThumbnailDeleteBtn>
                <AttachmentImage src={attachment} />
              </AttachmentWrapper>
            ) : (
              <UploadImage htmlFor='upload-image'>
                <PlusLg size='48px' color='white' />
              </UploadImage>
            )}
            <UploadInput id='upload-image' type='file' accept='image/*' onChange={onFileChange} />
          </ImageWrapper>
        </ImageBox>
      </S.Body>
      <ContainerBottom>
        {isLoading ? (
          <Loading />
        ) : (
          <SubmitButton onClick={onSubmitFile} disabled={!attachment}>
            ?????????
          </SubmitButton>
        )}
      </ContainerBottom>
    </S.Container>
  );
};

const Title = styled(S.Title)`
  margin-bottom: 10px;
`;

const Description = styled.div`
  margin-top: 12px;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.8;
  text-align: left;
  color: #888;
  padding: 0 12px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.8rem;
    line-height: 2;
  }

  li {
    /* list-style: circle; */
    list-style-position: inside;
    text-indent: -20px;
    padding-left: 20px;
  }

  a {
    font-weight: 700;
    color: ${({ theme }) => theme.color.main};
  }

  b {
    font-weight: 500;
    color: ${({ theme }) => theme.color.main};
  }
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const Img = styled.img`
  border-radius: 8px;
  width: 160px;
  height: 160px;

  @media ${({ theme }) => theme.size.mobile} {
    width: 140px;
    height: 140px;
  }
`;

const AttachmentImage = styled(Img)`
  object-fit: contain;
`;

const ImageWrapper = styled.div``;

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
  background-color: #ccc;
  padding: 8px;
  cursor: pointer;

  border-radius: 8px;
  width: 160px;
  height: 160px;

  @media ${({ theme }) => theme.size.mobile} {
    width: 140px;
    height: 140px;
  }
`;

const AttachmentWrapper = styled(UploadImage)`
  background-color: #ccc;
  position: relative;
`;

const ExampleImage = styled(UploadImage)``;

const UploadInput = styled.input`
  display: none;
`;

const Caption = styled.figcaption`
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 6px;
  color: #222;
`;

const ContainerBottom = styled.div``;

const SubmitButton = styled(S.NextButton)`
  &:disabled {
    cursor: default;
    background-color: #ccc;
    border: 1px solid #ccc;
  }
`;

export default ResidentAuthContainer;
