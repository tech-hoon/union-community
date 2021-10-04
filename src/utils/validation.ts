export const checkPostValidation = (
  title: string | null,
  category: string | null,
  content: string
) => {
  const contentHTML = document.createElement('div');
  contentHTML.innerHTML = content;
  return Boolean(title && category && contentHTML.textContent);
};
