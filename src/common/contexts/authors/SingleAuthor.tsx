import React, { createContext, useContext } from "react";

import {

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

export const SingleAuthorData = createContext<TSingleAuthorContext>({
  author: initialAuthor,
  isLoading: false,
  error: null,
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

  return (
    <SingleAuthorData.Provider
      value={{ author, isLoading, error }}
    >
      {children}
    </SingleAuthorData.Provider>
  );
};

export const useSingleAuthorContext = () => useContext(SingleAuthorData);

export default SingleAuthorContextProvider;
