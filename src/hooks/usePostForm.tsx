import { useState, RefObject } from 'react';
import { useHistory } from 'react-router';
import { PostType } from 'types';

interface Props {
  titleRef: RefObject<HTMLInputElement | null>;
  categoryRef: RefObject<HTMLSelectElement | null>;
  contentRef: RefObject<any>;
}

const usePostForm = ({ titleRef, categoryRef, contentRef }: Props) => {
  const history = useHistory();
  const [post, setPost] = useState<PostType>();

  const onEditorCancle = () => window.confirm('글 작성을 취소하시겠습니까?') && history.push('/');
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setPost({
      title: titleRef.current?.value!!,
      category: categoryRef.current?.value!!,
      content: contentRef.current?.state.value!!,
    });
  };

  return {
    post,
    onEditorCancle,
    onSubmit,
  };
};

export default usePostForm;
