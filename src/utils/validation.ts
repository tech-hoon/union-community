export const checkContentValidation = (content = '') => {
  const el = document.createElement('div');
  el.innerHTML = content;
  return !!el.textContent?.trim();
};

export const checkNullArgsValidation = (...args: any[]) =>
  ![...args].filter((arg) => !Boolean(arg)).length;
