export type TAuthor = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type TAllAuthorsContext = {
  authors: TAuthor[];
  isLoading: boolean;
  error: Error | null;
};

export type TSingleAuthorContext = {
  author: TAuthor;
  isLoading: boolean;
  error: Error | null;
};

export type TAuthorsAvatar = {
  url?: string;
  alt?: string;
};

export type TSingleAuthorsAvatarContext = {
  authorsAvatar: TAuthorsAvatar;
  isLoading: boolean;
  error: Error | null;
};
