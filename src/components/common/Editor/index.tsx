import ReactQuill from 'react-quill';
import React, { memo, forwardRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import './editor.css';

const Editor = forwardRef<any, any>((props, contentRef) => {
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image'],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    ],
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

export default memo(Editor);
