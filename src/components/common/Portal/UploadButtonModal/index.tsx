import PostUpload from 'assets/icons/PostUpload';
import StoreUpload from 'assets/icons/StoreUpload';
import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import S from './Layouts';

const UploadButtonModal = () => {
  const history = useHistory();

  const onClickMenu: React.MouseEventHandler<HTMLElement> = (e) => {
    const target = e.target as HTMLElement;
    const id = target.closest('li')?.id;

    switch (id) {
      case 'store':
        history.push({ pathname: '/product/upload', state: { mode: 'add', initialProduct: null } });
        break;

      case 'post':
        history.push({ pathname: '/post/upload', state: { mode: 'add', initialPost: null } });
        break;

      default:
        return;
    }
  };

  return (
    <S.List onClick={onClickMenu}>
      <S.Menu id='store'>
        <S.MenuTitle>장터/나눔 글쓰기</S.MenuTitle>
        <StoreUpload />
      </S.Menu>

      <S.Menu id='post'>
        <S.MenuTitle>새 글쓰기</S.MenuTitle>
        <PostUpload />
      </S.Menu>
    </S.List>
  );
};

export default memo(UploadButtonModal);
