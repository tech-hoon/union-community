interface Props {
  content: string | null;
  title: string | null;
  category: string | null;
}

export const checkPostValidation = ({ title, category, content }: Props) => {
  const contentHTML = document.createElement('div');
  contentHTML.innerHTML = content!!;
  return !!title && !!category && !!content;
};
