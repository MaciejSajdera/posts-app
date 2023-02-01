export type TPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export enum PostActions {
  SET_POSTS = "SET_DATA",
  ADD_POST = "ADD_POST",
  DELETE_POST = "DELETE_POST",
}

export type TPostAction = {
  type: PostActions;
  payload: TPost | TPost[];
};

export type TSingleAuthorsPostsContext = {
  state: TPost[];
  dispatch: React.Dispatch<TPostAction>;
};

export type TComment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};
