export interface CommentType {
  id: string;
  content: string;
  creator: UserType;
  created_at: number;
  liker_list: [];
  is_edited?: boolean;
  // reply_comment : string[] | [];
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
  resident_auth_image?: string;
};

export interface loginUserType extends UserType {}

export interface PostType {
  id: string;
  category: string;
  title: string;
  content: string;
  creator: UserType;
  liker_list: string[];
  created_at: number;
  attachment_url: string | '';
  visitor_list: string[];
  comment_list: CommentType[] | [];
}

export interface PostFormType {
  post: PostType;
  onEditorCancle: () => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}
