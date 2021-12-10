import styled from 'styled-components';
import ProfileBox from '../../ProfileBox';
import { memo, MouseEventHandler } from 'react';
import { useHistory } from 'react-router';
import { Messenger } from '@styled-icons/remix-line';

const Aside = () => {
  const history = useHistory();

  const onClickButton: MouseEventHandler<HTMLOrSVGElement> = (event) => {
    event.stopPropagation();
    const id = (event.target as HTMLElement).id;
    console.log(id);

    // switch (id) {
    //   case 'upload':
    //     history.push({ pathname: 'upload', state: { mode: 'add', initialPost: null } });
    //     break;
    //   case 'messenger':
    //     history.push({ pathname: '/messenger' });
    //     break;
    //   default:
    //     break;
    // }
  };

  return (
    <Wrapper onClick={onClickButton}>
      <NewPostBtn id='upload'>새 글 쓰기</NewPostBtn>
      <MessengerBtn id='messenger' size='24px' />
      <ProfileBox />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
`;

const MessengerBtn = styled(Messenger)`
  cursor: pointer;
`;

const NewPostBtn = styled.button`
  font-weight: 500;
  font-size: 1em;
  color: black;

  @media ${({ theme }) => theme.size.mobileS} {
    font-size: 0.8em;
  }
`;

export default memo(Aside);
