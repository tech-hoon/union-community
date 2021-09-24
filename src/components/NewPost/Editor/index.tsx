import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

interface Props {
  content: string;
  onChange: (value: string) => void;
}

const Editor = ({ content, onChange }: Props) => {
  const modules = {
    toolbar: [['link', 'image']],
  };

  const formats = ['header', 'link', 'image'];

  return (
    <ReactQuill
      theme='snow'
      style={{ height: '400px' }}
      modules={modules}
      formats={formats}
      value={content || ' '}
      onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
    />
  );
};

export default Editor;
