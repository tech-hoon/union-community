export interface CommentType {
  id: string;
  content: string;
  created_at: string;
  like_count: string;
}

export interface PostType {
  id?: string;
  category: string;
  title: string;
  content: string;
  creator: { uid?: string; displayName?: string };
  view_count: number;
  like_count: number;
  created_at: number;
  comment_list: CommentType[] | [];
}

export interface PostFormType {
  post: PostType;
  onEditorCancle: () => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}
