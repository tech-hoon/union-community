export interface CommentType {
  id: string;
  content: string;
  creator: CreatorType;
  created_at: number;
  liker_list: [];
  is_edited?: boolean;
}

export type CreatorType = {
  uid: string;
  nickname: string;
  avatarId: number;
};

export interface PostType {
  id?: string;
  category: string;
  title: string;
  content: string;
  creator: CreatorType;
  view_count: number;
  liker_list: [];
  like_count: number;
  created_at: number;
  comment: CommentType[] | [];
}

export interface PostFormType {
  post: PostType;
  onEditorCancle: () => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export interface loginUserType {
  nickname: string;
  uid: string;
  name: string;
  email: string;
  avatarId: number;
}
