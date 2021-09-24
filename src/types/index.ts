import React from 'react';

export interface MockPostType {
  id: number;
  name: string;
  body: string;
}

export interface PostType {
  title: string;
  category: string;
  content: string;
}

export interface PostFormType {
  post: PostType;
  onEditorCancle: () => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}
