import { CommentType } from 'types';
import { ADMIN_UID } from './config';

type ChildListType = {
  [key: string]: CommentType[];
};

export const changeReplyCommentOrder = (oldList: CommentType[]): CommentType[] => {
  const parentList = [];
  const childList: ChildListType = {};

  for (let i = 0; i < oldList.length; i++) {
    const parentKey = oldList[i].parent_comment_id;

    if (parentKey) {
      const parentIDs = childList[parentKey] || [];
      childList[parentKey] = [...parentIDs, oldList[i]];
      continue;
    }

    parentList.push(oldList[i]);
  }

  for (const key in childList) {
    const parentPos = parentList.findIndex(({ id }) => key === id);
    const childArray = childList[key];
    parentList.splice(parentPos + 1, 0, ...childArray);
  }

  return parentList;
};

export const convertNickname = (
  uid: string,
  is_deleted: boolean,
  is_secret: boolean,
  is_post_creator: boolean,
  nickname: string
) => {
  if (is_deleted) return '삭제됨';
  if (!is_secret) return nickname;
  if (is_post_creator) return '익명(글쓴이)';
  if (uid === ADMIN_UID) return '운영자';
  return '익명';
};
