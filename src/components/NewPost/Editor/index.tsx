import ReactQuill from 'react-quill';
import { memo, forwardRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import './editor.css';

const Editor = forwardRef((_, contentRef: any) => {
  const modules = {
    toolbar: [['link', 'image']],
  };

  const formats = ['header', 'link', 'image'];

  return (
    <ReactQuill
      ref={contentRef}
      theme='snow'
      style={{ height: '400px' }}
      modules={modules}
      formats={formats}
      value=''
    />
  );
});

export default memo(Editor);
