import { PRODUCT_STATUS, PRODUCT_TYPE, REPORT_LIST } from 'utils/config';

export interface CommentType {
  id: string;
  content: string;
  creator: UserType;
  created_at: number;
  liker_list: [];
  is_edited?: boolean;
  is_deleted: boolean;
  parent_comment_id: string | null;
  parent_comment_uid?: string | null;
}

export type RegisterDataType = {
  nickname: string;
  avatar_id: number;
};

export interface UserType extends RegisterDataType {
  name: string;
  uid: string;
  email: string | null;
  like_list: string[] | [];
  post_list: PostType[] | [];
  created_at?: number;
  updated_at?: number;
  resident_auth_image?: string;
  auth_status?: 'waiting' | 'approved' | 'rejected';
  notification_list: Notification[] | [];
  sent_message_list: MessageType[] | [];
  received_message_list: MessageType[] | [];
}

export interface LoginUserType extends UserType {}

export interface PostType {
  id: string;
  category: string;
  title: string;
  content: string;
  creator: UserType;
  created_at: number;
  attachment_url: [] | '';
  like_count: number;
  liker_list: string[];
  visitor_list: string[];
  comment_count: number;
  is_edited: boolean;
  is_secret?: boolean;
}

export interface ProductPostType extends PostType {
  status: string;
  type: string;
  price?: string;
}

export interface PostFormType {
  post: PostType;
  onEditorCancle: () => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export interface NotificationType {
  id: string;
  text: string;
  created_at: number;
  sender: UserType | string;
  link: string;
  is_secret: boolean;
  post_title: string;
}

export interface MessageType {
  id: string;
  text: string;
  created_at: number;
  user: UserType | string;
  is_secret: boolean;
}

export interface ReportType {
  type: typeof REPORT_LIST[number];
  content: string;
  reportee: UserType;
  reporter: UserType;
  created_at: number;
}
