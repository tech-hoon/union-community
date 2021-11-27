import styled from 'styled-components';
import ProfileBox from '../../ProfileBox';
import { memo } from 'react';
import { useHistory } from 'react-router';

interface Props {
  isLoggedIn: boolean;
}

const Aside = ({ isLoggedIn }: Props) => {
  const history = useHistory();

  const onClickButton = () => {
    history.push({ pathname: '/upload', state: { mode: 'add', initialPost: null } });
  };

  return (
    <Wrapper>
      {isLoggedIn && (
        <>
          <NewPostBtn onClick={onClickButton}>새 글 쓰기</NewPostBtn>
          <ProfileBox />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NewPostBtn = styled.button`
  font-weight: 500;
  font-size: 1em;

  @media ${({ theme }) => theme.size.mobileS} {
    font-size: 0.8em;
  }
`;

export default memo(Aside);
