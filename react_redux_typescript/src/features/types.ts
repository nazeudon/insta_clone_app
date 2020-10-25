// file objectに関する型定義
export interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}

// authSlice.ts
export interface PROPS_AUTHEN {
  email: string;
  password: string;
}

export interface PROPS_PROFILE {
  id: number;
  nickName: string;
  img: File | null;
}

export interface PROPS_NICKNAME {
  nickName: string;
}

// postSlice.ts
export interface PROPS_NEWPOST {
  title: string;
  img: File | null;
}

export interface PROPS_LIKED {
  id: number; //投稿id
  title: string;
  current: number[]; //すでにイイねしているユーザのid
  new: number; //新規でイイねしたユーザのid
}

export interface PROPS_COMMENT {
  text: string;
  post: number; //投稿id?
}

// Post.tsx
export interface PROPS_POST {
  postId: number; //投稿id
  loginId: number; //ログインユーザid
  userPost: number; //投稿ユーザのid
  title: string;
  imageUrl: string;
  liked: number[];
}
