import { useState, RefObject } from 'react';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { addPost, updatePost } from 'api/post';
import { loginUserState } from 'store/loginUser';
import { loginUserType, PostType } from 'types';
import { checkPostValidation } from 'utils/validation';
import { storageService } from 'service/firebase';
import { postDetail } from 'store/post';

interface Props {
  titleRef: RefObject<HTMLInputElement | null>;
  categoryRef: RefObject<HTMLSelectElement | null>;
  contentRef: RefObject<any>;
  postId?: string;
  mode: string;
}

const usePostForm = ({ titleRef, categoryRef, contentRef, mode, postId }: Props) => {
  const history = useHistory();
  const postPrevState = useRecoilValue(postDetail);
  const [attachment, setAttachment] = useState('');
  const loginUser = useRecoilValue(loginUserState) as loginUserType;

  const onEditorCancle = () => window.confirm('글 작성을 취소하시겠습니까?') && history.push('/');

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (event: any) => {
    const file = event.target.files[0]!!;
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

  const onDeleteAttachment: React.MouseEventHandler<HTMLButtonElement> = () => {
    setAttachment('');
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    postPrevState?.attachment_url &&
      (await storageService.refFromURL(postPrevState.attachment_url).delete());

    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentRef = storageService.ref().child(`${loginUser.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, 'data_url');
      attachmentUrl = await response.ref.getDownloadURL();
    }

    const postInput = {
      title: titleRef.current?.value!!,
      category: categoryRef.current?.value!!,
      content: contentRef.current?.value.replaceAll('\n', '<br/>'),
      attachment_url: attachmentUrl,
    };

    if (checkPostValidation(postInput)) {
      if (mode === 'add') {
        const __postId = await addPost({ postInput, creator: loginUser });
        history.push({
          pathname: `/post/${__postId}`,
          state: 'isAdded',
        });
        return;
      }

      if (mode === 'update') {
        postId && (await updatePost({ postInput, creator: loginUser, postId }));
        history.push({
          pathname: `/post/${postId}`,
          state: 'isUpdated',
        });
        return;
      }
      return;
    }
    window.alert('내용을 모두 작성해 주세요.');
  };

  return {
    attachment,
    setAttachment,
    onEditorCancle,
    onFileChange,
    onDeleteAttachment,
    onSubmit,
  };
};

export default usePostForm;
