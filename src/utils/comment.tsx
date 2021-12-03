import { CommentType } from 'types';

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
