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
    e.preventDefault();

    if (
      checkPostValidation(
        titleRef.current?.value!!,
        categoryRef.current?.value!!,
        contentRef.current?.state.value!!
      )
    ) {
      await dbService.collection('posts').add({
        category: categoryRef.current?.value!!,
        title: titleRef.current?.value!!,
        content: contentRef.current?.state.value!!,
        creator: loginUser,
        view_count: 0,
        like_count: 0,
        createdAt: new Date().toLocaleDateString(),
        comment_list: [],
      });

      setPost({
        title: titleRef.current?.value!!,
        category: categoryRef.current?.value!!,
        content: contentRef.current?.state.value!!,
      });
    } else {
      window.alert('글을 모두 작성해주세요');
    }
  };

  return {
    post,
    onEditorCancle,
    onSubmit,
  };
};

export default usePostForm;
