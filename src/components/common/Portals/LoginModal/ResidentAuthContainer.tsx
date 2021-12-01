import styled from 'styled-components';
import useLoginStep from 'hooks/useLoginStep';
import { useState, useEffect } from 'react';
import { authService, dbService } from 'service/firebase';
import { loginUserState } from 'store/loginUser';
import exampleImgSrc from 'assets/images/resident1.jpeg';

interface Props {}

const ResidentAuthContainer = (props: Props) => {
  const { onLoginStepNext } = useLoginStep();
  const { displayName }: any = authService.currentUser;
  const [attachment, setAttachment] = useState('');

  const handleStepNext = () => {
    //TODO:인증 완료 됐다면
    try {
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

  useEffect(() => {
    attachment && setAttachment(attachment);
  }, [attachment]);

  return (
    <Wrapper>
      {/* <Title>{displayName}님, 생활관 거주 인증을 해주세요!</Title> */}
      <Title>생활관 거주 인증</Title>
      <Subtitle>준비중인 기능입니다.</Subtitle>
      {/* <Body>
        <ImageBox>
          <ImageWrapper>
            <Caption>예시 사진</Caption>
            <ExampleImage src={exampleImgSrc} />
          </ImageWrapper>
          <ImageWrapper>
            <Caption>업로드 사진</Caption>
            <AttachmentImage src={attachment} />
          </ImageWrapper>
        </ImageBox>
        <UploadImageBtn htmlFor='upload-image'>업로드</UploadImageBtn>
        <UploadInput id='upload-image' type='file' accept='image/*' onChange={onFileChange} />
      </Body> */}
      <Button onClick={handleStepNext}>다음</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 24px;
`;

const Body = styled.div`
  margin: 5% auto;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 48px 0;
  gap: 40px;
`;

const ExampleImage = styled.img`
  width: 150px;
`;
const AttachmentImage = styled.img`
  width: 150px;
`;

const ImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  border: 1px solid black;
`;

const UploadImageBtn = styled.label`
  cursor: pointer;
  border: 1px solid black;
  border-radius: 4px;
  padding: 4px 12px;
  margin: 0 auto;
`;

const UploadInput = styled.input`
  display: none;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.8em;

  @media ${({ theme }) => theme.size.mobile} {
    /* font-size: 1.5em; */
  }
`;

const Subtitle = styled.h2`
  margin: 20% 0;
`;

const Caption = styled.figcaption`
  text-align: center;
  margin-bottom: 4px;
`;

const Button = styled.button`
  border-radius: 8px;
  padding: 8px 36px;
  margin: 0 auto;
  font-size: 1rem;
  color: white;
  background-color: #18a0fb;
`;

export default ResidentAuthContainer;
