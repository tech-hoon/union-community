import React, { useState, RefObject, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { addPost, updatePost } from 'api/post';
import { loginUserState } from 'store/loginUser';
import { LoginUserType, PostType } from 'types';
import { checkPostValidation } from 'utils/validation';
import { storageService } from 'service/firebase';

interface Props {
  titleRef: RefObject<HTMLInputElement | null>;
  categoryRef: RefObject<HTMLSelectElement | null>;
  contentRef: RefObject<any>;
  mode: 'add' | 'update';
  prevPost: PostType | null;
}

const usePostForm = ({ titleRef, categoryRef, contentRef, mode, prevPost }: Props) => {
  const history = useHistory();
  const [attachments, setAttachment] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorInfo, setErrorInfo] = useState<boolean>();
  const loginUser = useRecoilValue(loginUserState) as LoginUserType;

  const onEditorCancle = () => history.push('/');

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = (event.target as HTMLInputElement).files;
    const reader = new FileReader();

    const readFile = (index: number) => {
      if (!!files) {
        if (index >= files.length) {
          return;
        }

        const file = files[index];
        reader.onloadend = (finishedEvent: any) => {
          const {
            currentTarget: { result },
          } = finishedEvent;

          setAttachment((prev) => [...prev, result]);
          readFile(index + 1);
        };
        reader.readAsDataURL(file);
      }
    };

    readFile(0);
  };

  const onDeleteAttachment: React.MouseEventHandler<HTMLElement> = (event) => {
    const target = event.target as HTMLElement;
    const id = Number(target.dataset.id);
    const prevArr = [...attachments];
    prevArr.splice(id, 1);

    setAttachment(prevArr);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const urls: string[] = [];

    const prevAttachments = (prevPost?.attachment_url || []).filter(
      (x) => !attachments.includes(x)
    );

    if (
      !checkPostValidation(
        titleRef.current?.value!!,
        categoryRef.current?.value!!,
        contentRef.current?.value
      )
    ) {
      setErrorInfo(true);
      return;
    }

    // 첨부 파일 있고,
    if (attachments.length) {
      for (let i = 0; i < attachments.length; i++) {
        // 기존 attachment_url 있는 경우 그대로 db로
        if (attachments[i].indexOf('firebasestorage') !== -1) {
          urls.push(attachments[i]);
        } else {
          const attachmentRef = storageService.ref().child(`${loginUser.uid}/${uuidv4()}`);
          const response = await attachmentRef.putString(attachments[i], 'data_url');
          const url = await response.ref.getDownloadURL();

          console.log('url', url);

          urls.push(url);
        }
      }
    }

    // 새로운 첨부파일과 겹치지 않는 기존 파일 db 제거
    prevAttachments.forEach(async (attachment) => {
      await storageService.refFromURL(attachment).delete();
    });

    const postInput = {
      title: titleRef.current?.value!!,
      category: categoryRef.current?.value!!,
      content: contentRef.current?.value.replaceAll('\n', '<br/>'),
      attachment_url: urls,
    };

    if (mode === 'add') {
      setIsUploading(true);
      const __postId = await addPost({ postInput, uid: loginUser.uid });
      history.push({
        pathname: `/posts/${__postId}`,
        state: 'isAdded',
      });
      return;
    }

    if (mode === 'update') {
      setIsUploading(true);
      prevPost?.id && (await updatePost({ postInput, uid: loginUser.uid, postId: prevPost.id }));
      history.push({
        pathname: `/posts/${prevPost?.id}`,
        state: 'isUpdated',
      });
      return;
    }
  };

  return {
    attachments,
    setAttachment,
    setIsUploading,
    onEditorCancle,
    onFileChange,
    onDeleteAttachment,
    onSubmit,
    isUploading,
    errorInfo,
  };
};

export default usePostForm;
