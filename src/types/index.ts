export interface CommentType {
  id: string;
  content: string;
  creator: UserType;
  created_at: number;
  liker_list: [];
  is_edited?: boolean;
}

export type UserType = {
  name: string;
  avatar_id: number;
  nickname: string;
  uid: string;
  email: string;
  like_list: string[] | [];
  post_list: PostType[] | [];
  created_at?: number;
  updated_at?: number;
};

export interface loginUserType extends UserType {}

export interface PostType {
  id: string;
  category: string;
  title: string;
  content: string;
  creator: UserType;
  view_count: number;
  liker_list: string[];
  created_at: number;
  comment?: CommentType[] | [];
  attachment_url?: string;
}

export interface PostFormType {
  post: PostType;
  onEditorCancle: () => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}
