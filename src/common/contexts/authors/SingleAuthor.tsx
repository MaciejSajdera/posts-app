import React, { createContext, useContext } from "react";

import {
  useAuthorImagesQuery,
  useSingleAuthorQuery,
} from "@/common/hooks/authors";
import { TAuthor, TAuthorsAvatar, TSingleAuthorContext } from "./types";

const initialAuthor: TAuthor = {
  id: 0,
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
};
const initialAuthorsAvatar: TAuthorsAvatar = {
  url: "./avatar-placeholder.png",
  alt: "alt text",
};

export const SingleAuthorData = createContext<TSingleAuthorContext>({
  author: initialAuthor,
  isLoading: false,
  error: null,
  authorsAvatar: initialAuthorsAvatar,
});

const SingleAuthorContextProvider = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: number;
}) => {
  const {
    isLoading,
    error,
    data: author = initialAuthor,
  } = useSingleAuthorQuery(id);
  const { data: authorsAvatar = {} } = useAuthorImagesQuery(id, 1);

  return (
    <SingleAuthorData.Provider
      value={{ author, isLoading, error, authorsAvatar }}
    >
      {children}
    </SingleAuthorData.Provider>
  );
};

export const useSingleAuthorContext = () => useContext(SingleAuthorData);

export default SingleAuthorContextProvider;
