import React, { useState, RefObject, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { addPost, updatePost } from 'api/post';
import { loginUserState } from 'store/loginUser';
import { LoginUserType, PostType } from 'types';
import { checkContentValidation, checkNullArgsValidation } from 'utils/validation';
import { storageService } from 'service/firebase';

interface Props {
  titleRef: RefObject<HTMLInputElement | null>;
  categoryRef: RefObject<HTMLSelectElement | null>;
  contentRef: RefObject<HTMLTextAreaElement | null>;
  mode: 'add' | 'update';
  prevPost: PostType | null;
}

const usePostForm = ({ titleRef, categoryRef, contentRef, mode, prevPost }: Props) => {
  const history = useHistory();
  const [attachments, setAttachment] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorInfo, setErrorInfo] = useState<string>('');
  const loginUser = useRecoilValue(loginUserState) as LoginUserType;

  const onEditorCancle = () => history.goBack();

  const onErrorInfoReset = () => setErrorInfo('');

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const MAX_FILE_LENGTH = 5;

    const files = Array.from(e.target.files as FileList);

    const newImages = await Promise.all(
      [...files.slice(0, MAX_FILE_LENGTH)].map(async (file) =>
        imageCompression.getDataUrlFromFile(await imageCompression(file, { maxSizeMB: 1 }))
      )
    );

    setAttachment((prev) => {
      if (prev.length + newImages.length > MAX_FILE_LENGTH) {
        setErrorInfo(`⚠️ 최대 ${MAX_FILE_LENGTH}개까지 업로드할 수 있습니다.`);
        return [...prev, ...newImages].splice(0, 5);
      }
      return [...prev, ...newImages];
    });
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
    setIsUploading(true);

    const urls: string[] = [];

    const prevAttachments = (prevPost?.attachment_url || []).filter(
      (x) => !attachments.includes(x)
    );

    if (
      !checkNullArgsValidation(titleRef.current?.value!!, categoryRef.current?.value!!) ||
      !checkContentValidation(contentRef.current?.value)
    ) {
      setErrorInfo('⚠️ 내용을 모두 입력해 주세요.');
      setIsUploading(false);
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
      content: contentRef.current?.value.replaceAll('\n', '<br/>') || '',
      attachment_url: urls,
    };

    if (mode === 'add') {
      const __postId = await addPost({ postInput, uid: loginUser.uid });
      history.push({
        pathname: `/posts/${__postId}`,
        state: 'isAdded',
      });
      setIsUploading(false);
      return;
    }

    if (mode === 'update') {
      prevPost?.id && (await updatePost({ postInput, uid: loginUser.uid, postId: prevPost.id }));
      history.push({
        pathname: `/posts/${prevPost?.id}`,
        state: 'isUpdated',
      });
      setIsUploading(false);
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
    onErrorInfoReset,
  };
};

export default usePostForm;
