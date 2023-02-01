import React, { createContext, useContext } from "react";

import { useAuthorImagesQuery } from "@/common/hooks/authors";
import { TAuthorsAvatar, TSingleAuthorsAvatarContext } from "./types";

const initialAuthorsAvatar: TAuthorsAvatar = {
  url: "./avatar-placeholder.png",
  alt: "alt text",
};

export const SingleAuthorsAvatar = createContext<TSingleAuthorsAvatarContext>({
  isLoading: false,
  error: null,
  authorsAvatar: initialAuthorsAvatar,
});

const SingleAuthorsAvatarContextProvider = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: number;
}) => {
  const {
    data: authorsAvatar = {},
    isLoading,
    error,
  } = useAuthorImagesQuery(id, 1);

  return (
    <SingleAuthorsAvatar.Provider value={{ isLoading, error, authorsAvatar }}>
      {children}
    </SingleAuthorsAvatar.Provider>
  );
};

export const useSingleAuthorsAvatarContext = () =>
  useContext(SingleAuthorsAvatar);

export default SingleAuthorsAvatarContextProvider;
