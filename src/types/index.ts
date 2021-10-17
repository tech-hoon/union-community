export interface CommentType {
  id?: string;
  content: string;
  creator: CreatorType;
  created_at: number;
  like_count: number;
  liker_list: [];
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
  like_count: number;
  created_at: number;
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
  residentAuthenticated: boolean;
  registerDone: boolean;
}
