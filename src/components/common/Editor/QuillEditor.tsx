import ReactQuill, { Quill } from 'react-quill';
import { memo, forwardRef, useEffect, useCallback } from 'react';
import ImageResize from 'quill-image-resize';
import MagicUrl from 'quill-magic-url';
import ImageDropAndPaste from 'quill-image-drop-and-paste';

import 'react-quill/dist/quill.snow.css';
import './quill.css';

Quill.register('modules/image-resize', ImageResize);
Quill.register('modules/magic-url', MagicUrl);
Quill.register('modules/image-drop-and-paste', ImageDropAndPaste);

const QuillEditor = forwardRef<any, any>((props, contentRef) => {
  const imageHandler = useCallback(async (dataUrl, type, imageData) => {
    console.log('dataUrl', dataUrl);
    console.log('type', type);
    console.log('image data', imageData);

    //   const quill = quillInstance.current;
    //   const { preSignedUrl, fileName } = await studyService.getPresignedUrl(
    //     user.nickName
    //   );

    //   const imageFile = imageData.toFile(fileName);
    //   const imageUrl = `https://hola-post-image.s3.ap-northeast-2.amazonaws.com/${fileName}`;

    //   /* bucket image upload */
    //   await studyService.uploadImageToS3(preSignedUrl, imageFile);
    //   let index = (quill.getSelection() || {}).index;
    //   if (index === undefined || index < 0) index = quill.getLength();
    //   quill.insertEmbed(index, "image", imageUrl, "user");
    //   quill.setSelection(quill.getSelection().index + 1, 0); // image upload 후 cursor 이동
  }, []);

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image'],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    ],

    handlers: {
      image: imageHandler,
    },

    'image-drop-and-paste': {
      handler: imageHandler,
    },
    'magic-url': true,

    'image-resize': {
      parchment: Quill.import('parchment'),
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'link',
    'image',
    'color',
    'background',
  ];

  return (
    <ReactQuill
      ref={contentRef}
      placeholder={`유니온은 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다. 위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다.`}
      theme='snow'
      style={{ height: '50vh' }}
      modules={modules}
      formats={formats}
      {...props}
    />
  );
});

export default memo(QuillEditor);
