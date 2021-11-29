export const checkPostValidation = (
  title: string | null,
  category: string | null,
  content: string | null
) => {
  const contentHTML = document.createElement('div');
  contentHTML.innerHTML = content!!;
  return !!title && !!category && !!content;
};
