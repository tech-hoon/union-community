import { useState, RefObject, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { addPost, updatePost } from 'api/post';
import { loginUserState } from 'store/loginUser';
import { loginUserType, PostType } from 'types';
import { checkPostValidation } from 'utils/validation';
import { storageService } from 'service/firebase';

interface Props {
  titleRef: RefObject<HTMLInputElement | null>;
  categoryRef: RefObject<HTMLSelectElement | null>;
  contentRef: RefObject<any>;
  mode: string;
  prevPost: PostType | null;
}

const usePostForm = ({ titleRef, categoryRef, contentRef, mode, prevPost }: Props) => {
  const history = useHistory();
  const [attachment, setAttachment] = useState('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const loginUser = useRecoilValue(loginUserState) as loginUserType;

  const onEditorCancle = () => window.confirm('글 작성을 취소하시겠습니까?') && history.push('/');

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

  const onDeleteAttachment: React.MouseEventHandler<HTMLButtonElement> = () => {
    setAttachment('');
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    let attachmentUrl = '';

    if (
      !checkPostValidation(
        titleRef.current?.value!!,
        categoryRef.current?.value!!,
        contentRef.current?.value
      )
    ) {
      window.alert('내용을 모두 작성해 주세요.');
      return;
    }

    // 첨부 파일 있고,
    if (attachment !== '') {
      // 기존 attachment_url 있는 경우 그대로 db로
      if (attachment.indexOf('firebasestorage') !== -1) {
        attachmentUrl = attachment;
      } else {
        // 기존에 있는거 삭제
        if (!!prevPost?.attachment_url) {
          await storageService.refFromURL(prevPost.attachment_url).delete();
        }

        // 새로운 attachment, url 따와서
        const attachmentRef = storageService.ref().child(`${loginUser.uid}/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment, 'data_url');
        attachmentUrl = await response.ref.getDownloadURL();
      }
    } else {
      // 기존에 있는거 삭제
      if (!!prevPost?.attachment_url) {
        await storageService.refFromURL(prevPost.attachment_url).delete();
      }
    }

    const postInput = {
      title: titleRef.current?.value!!,
      category: categoryRef.current?.value!!,
      content: contentRef.current?.value.replaceAll('\n', '<br/>'),
      attachment_url: attachmentUrl,
    };

    if (mode === 'add') {
      const __postId = await addPost({ postInput, uid: loginUser.uid });
      history.push({
        pathname: `/post/${__postId}`,
        state: 'isAdded',
      });
      return;
    }

    if (mode === 'update') {
      prevPost?.id && (await updatePost({ postInput, uid: loginUser.uid, postId: prevPost.id }));
      history.push({
        pathname: `/post/${prevPost?.id}`,
        state: 'isUpdated',
      });
      return;
    }
    return;
  };

  return {
    attachment,
    setAttachment,
    onEditorCancle,
    onFileChange,
    onDeleteAttachment,
    onSubmit,
    isUploading,
  };
};

export default usePostForm;
