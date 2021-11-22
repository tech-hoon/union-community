import { CATEGORY_LIST } from './config';

export const categoryColor = (category: string) =>
  CATEGORY_LIST.filter(({ kor }) => kor === category)[0].color;
