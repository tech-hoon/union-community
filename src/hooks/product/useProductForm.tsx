import React, { useState, RefObject, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { addPost, updatePost } from 'api/post';
import { loginUserState } from 'store/loginUser';
import { LoginUserType, ProductPostType } from 'types';
import { checkContentValidation, checkNullArgsValidation } from 'utils/validation';
import { storageService } from 'service/firebase';
import { PRODUCT_STATUS, PRODUCT_TYPE } from 'utils/config';

interface Props {
  titleRef: RefObject<HTMLInputElement | null>;
  statusRef: RefObject<HTMLSelectElement | null>;
  contentRef: RefObject<HTMLTextAreaElement | null>;
  type: typeof PRODUCT_TYPE[number];
  price: string;
  mode: 'add' | 'update';
  prevProduct: ProductPostType | null;
}

const useProductForm = ({
  titleRef,
  statusRef,
  contentRef,
  type,
  price,
  mode,
  prevProduct,
}: Props) => {
  const history = useHistory();
  const [attachments, setAttachment] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorInfo, setErrorInfo] = useState<string>('');
  const loginUser = useRecoilValue(loginUserState) as LoginUserType;

  const onEditorCancle = () => history.goBack();

  const onErrorInfoReset = () => setErrorInfo('');

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

          setAttachment((prev) => {
            if (prev.length >= 5) {
              setErrorInfo('⚠️ 최대 5개까지 업로드할 수 있습니다.');
              return prev;
            }
            return [...prev, result];
          });
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

    const prevAttachments = (prevProduct?.attachment_url || []).filter(
      (x) => !attachments.includes(x)
    );

    if (
      !checkContentValidation(contentRef.current?.value) ||
      !checkNullArgsValidation(statusRef.current?.value, attachments.length) ||
      (type === '판매' && !price)
    ) {
      setErrorInfo('⚠️ 내용을 모두 입력해 주세요.');
      return;
    }

    if (attachments.length) {
      // 첨부 파일 있고,
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

    const inputArgs = {
      title: titleRef.current?.value!!,
      status: statusRef.current?.value!!,
      content: contentRef.current?.value.replaceAll('\n', '<br/>') || '',
      type: type,
      price: price,
      attachment_url: urls,
      category: '장터/나눔',
    };

    if (mode === 'add') {
      setIsUploading(true);
      const __postId = await addPost({ postInput: inputArgs, uid: loginUser.uid });
      history.push({
        pathname: `/posts/${__postId}`,
        state: 'isAdded',
      });
      return;
    }

    if (mode === 'update') {
      setIsUploading(true);
      prevProduct?.id &&
        (await updatePost({
          postInput: inputArgs,
          uid: loginUser.uid,
          postId: prevProduct?.id,
        }));
      history.push({
        pathname: `/posts/${prevProduct?.id}`,
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
    onErrorInfoReset,
  };
};

export default useProductForm;