import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import NotFoundLogo from 'assets/logo/NotFoundLogo';

interface Props {}

const NotFound = (props: Props) => {
  const history = useHistory();

  const onClickButton = () => {
    history.push({ pathname: '/home', state: 'isDeleted' });
  };

  return (
    <Wrapper>
      <ImageWrapper>
        <NotFoundLogo />
      </ImageWrapper>
      <Title>요청하신 페이지를 찾을 수 없습니다.</Title>
      <HomeButton onClick={onClickButton}>홈으로 가기</HomeButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 28px;
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
`;

const ImageWrapper = styled.div`
  width: clamp(180px, 60vw, 220px);
`;

const HomeButton = styled.button`
  background-color: black;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 1.2rem;
  font-weight: 500;
`;

export default NotFound;
