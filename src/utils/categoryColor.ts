import { CATEGORY_LIST, PRODUCT_STATUS, PRODUCT_TYPE } from './config';

export const categoryColor = (category: string) =>
  CATEGORY_LIST.filter(({ kor }) => kor === category)[0]?.color || 'black';

export const productTypeColor = (category: string) =>
  PRODUCT_TYPE.filter(({ kor }) => kor === category)[0].color;

export const productStatusColor = (category: string) =>
  PRODUCT_STATUS.filter(({ kor }) => kor === category)[0].color;
