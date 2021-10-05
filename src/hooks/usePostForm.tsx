import { useState, RefObject } from 'react';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import { dbService } from 'service/firebase';
import { loginUserState } from 'store/loginUser';
import { PostType } from 'types';
import { checkPostValidation } from 'utils/validation';

interface Props {
  titleRef: RefObject<HTMLInputElement | null>;
  categoryRef: RefObject<HTMLSelectElement | null>;
  contentRef: RefObject<any>;
}

const usePostForm = ({ titleRef, categoryRef, contentRef }: Props) => {
  const history = useHistory();
  const [post, setPost] = useState<PostType>();
  const loginUser = useRecoilValue(loginUserState);
  const onEditorCancle = () => window.confirm('글 작성을 취소하시겠습니까?') && history.push('/');
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    const postInput = {
      title: titleRef.current?.value!!,
      category: categoryRef.current?.value!!,
      content: contentRef.current?.state.value!!,
    };

    e.preventDefault();
    if (checkPostValidation(postInput)) {
      dbService.collection('posts').add({
        ...postInput,
        creator: loginUser,
        view_count: 0,
        like_count: 0,
        created_at: new Date().getTime(),
        comment_list: [],
      });
    } else {
      window.alert('내용을 모두 작성해 주세요.');
    }
  };

  return {
    post,
    onEditorCancle,
    onSubmit,
  };
};

export default usePostForm;
